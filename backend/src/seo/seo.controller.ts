import { Controller, Get, Post, Param, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('seo')
@Controller('seo')
export class SeoController {
  constructor(private service: SeoService) {}

  @Get('pages')
  @ApiOperation({ summary: 'لیست صفحات SEO منتشرشده' })
  async findPublished(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.service.findPublishedPages({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }

  @Get('pages/:slug')
  @ApiOperation({ summary: 'دریافت صفحه SEO با slug' })
  async findBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post('pages')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin', 'seo_manager', 'editor')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ایجاد صفحه SEO جدید' })
  async create(@Body() data: any) {
    return this.service.create(data);
  }

  @Post('generate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin', 'seo_manager')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تولید صفحات SEO برای دسته+شهر' })
  async generatePages(@Body() data: { categoryId: number; cityIds: number[] }) {
    return this.service.generateCategoryCityPages(data.categoryId, data.cityIds);
  }

  @Get('sitemap')
  @ApiOperation({ summary: 'دریافت داده‌های نقشه سایت' })
  async sitemap() {
    return this.service.getSitemap();
  }
}
