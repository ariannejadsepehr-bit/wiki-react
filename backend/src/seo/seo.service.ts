import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  async findPublishedPages(params: { page?: number; limit?: number }) {
    const { page = 1, limit = 50 } = params;
    return this.prisma.seoPage.findMany({
      where: { status: 'published' },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { viewCount: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    const page = await this.prisma.seoPage.findUnique({ where: { slug } });
    if (page) {
      await this.prisma.seoPage.update({
        where: { slug },
        data: { viewCount: { increment: 1 } },
      });
    }
    return page;
  }

  async create(data: any) {
    return this.prisma.seoPage.create({ data });
  }

  async generateCategoryCityPages(categoryId: number, cityIds: number[]) {
    const category = await this.prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return [];

    const cities = await this.prisma.city.findMany({ where: { id: { in: cityIds } } });
    const pages = [];

    for (const city of cities) {
      const slug = `${category.slug}-${city.slug}`;
      const existing = await this.prisma.seoPage.findUnique({ where: { slug } });
      if (existing) continue;

      const page = await this.prisma.seoPage.create({
        data: {
          title: `بهترین ${category.name} ${city.name}`,
          slug,
          h1: `بهترین ${category.name} ${city.name}`,
          metaTitle: `بهترین ${category.name} ${city.name} | ویکی بهترین`,
          metaDescription: `لیست بهترین ${category.name}های ${city.name} با امتیاز و نظرات واقعی کاربران.`,
          categoryId,
          cityId: city.id,
          provinceId: city.provinceId,
          status: 'draft',
        },
      });
      pages.push(page);
    }
    return pages;
  }

  async getSitemap() {
    const pages = await this.prisma.seoPage.findMany({
      where: { status: 'published' },
      select: { slug: true, updatedAt: true },
    });
    const businesses = await this.prisma.business.findMany({
      where: { status: 'active' },
      select: { slug: true, updatedAt: true },
    });
    return { pages, businesses };
  }
}
