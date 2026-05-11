import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async findByBusiness(businessId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { businessId, isApproved: true, isSpam: false },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { responses: true, user: { select: { id: true, fullName: true, avatarUrl: true } } },
      }),
      this.prisma.review.count({ where: { businessId, isApproved: true, isSpam: false } }),
    ]);
    return { data, meta: { page, limit, total } };
  }

  async create(data: { businessId: string; userId: string; rating: number; title?: string; body?: string }) {
    const review = await this.prisma.review.create({ data });
    await this.updateBusinessRating(data.businessId);
    return review;
  }

  async respond(reviewId: string, businessId: string, body: string) {
    return this.prisma.reviewResponse.create({
      data: { reviewId, businessId, body },
    });
  }

  async markHelpful(id: string) {
    return this.prisma.review.update({
      where: { id },
      data: { helpfulCount: { increment: 1 } },
    });
  }

  async report(id: string) {
    return this.prisma.review.update({
      where: { id },
      data: { isSpam: true, spamScore: 1.0 },
    });
  }

  private async updateBusinessRating(businessId: string) {
    const result = await this.prisma.review.aggregate({
      where: { businessId, isApproved: true, isSpam: false },
      _avg: { rating: true },
      _count: true,
    });
    await this.prisma.business.update({
      where: { id: businessId },
      data: {
        avgRating: result._avg.rating ?? 0,
        reviewCount: result._count,
      },
    });
  }
}
