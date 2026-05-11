import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class BusinessesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    cityId?: number;
    categoryId?: number;
    status?: string;
    search?: string;
  }) {
    const { page = 1, limit = 20, cityId, categoryId, status, search } = params;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (cityId) where.cityId = cityId;
    if (status) where.status = status;
    if (categoryId) where.categories = { some: { categoryId } };
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.business.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rankingScore: 'desc' },
        include: {
          categories: { include: { category: true } },
          city: true,
          province: true,
        },
      }),
      this.prisma.business.count({ where }),
    ]);

    return {
      data,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findBySlug(slug: string) {
    const business = await this.prisma.business.findUnique({
      where: { slug },
      include: {
        categories: { include: { category: true } },
        city: true,
        province: true,
        branches: true,
        services: { orderBy: { sortOrder: 'asc' } },
        hours: { orderBy: { dayOfWeek: 'asc' } },
        gallery: { orderBy: { sortOrder: 'asc' } },
        faqs: { orderBy: { sortOrder: 'asc' } },
        reviews: {
          where: { isApproved: true, isSpam: false },
          orderBy: { createdAt: 'desc' },
          take: 20,
          include: { responses: true },
        },
      },
    });

    if (!business) throw new NotFoundException();
    return business;
  }

  async create(data: any, ownerId: string) {
    return this.prisma.business.create({
      data: { ...data, ownerId, status: 'pending' },
    });
  }

  async update(id: string, data: any, ownerId: string) {
    const business = await this.prisma.business.findUnique({ where: { id } });
    if (!business) throw new NotFoundException();
    if (business.ownerId !== ownerId) throw new NotFoundException();

    return this.prisma.business.update({ where: { id }, data });
  }

  async incrementViewCount(id: string) {
    return this.prisma.business.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }
}
