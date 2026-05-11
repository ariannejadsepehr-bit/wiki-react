import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: { email: string; password: string; fullName?: string; phone?: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('ایمیل قبلاً ثبت شده است');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        fullName: dto.fullName,
        phone: dto.phone,
      },
    });

    const tokens = await this.generateTokens(user.id, user.role);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('ایمیل یا رمز عبور اشتباه است');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), refreshToken: null },
    });

    const tokens = await this.generateTokens(user.id, user.role);
    return { user: this.sanitizeUser(user), ...tokens };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.config.get('JWT_SECRET'),
      });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || user.refreshToken !== refreshToken) throw new UnauthorizedException();

      const tokens = await this.generateTokens(user.id, user.role);
      return tokens;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, role: true, isVerified: true },
    });
  }

  private async generateTokens(userId: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync({ sub: userId, role }),
      this.jwt.signAsync(
        { sub: userId, role },
        { secret: this.config.get('JWT_SECRET'), expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN', '7d') },
      ),
    ]);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  private sanitizeUser(user: any) {
    const { passwordHash, refreshToken, ...result } = user;
    return result;
  }
}
