import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('ai')
@Controller('ai')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin', 'editor', 'seo_manager', 'business_owner')
@ApiBearerAuth()
export class AiController {
  constructor(private service: AiService) {}

  @Post('generate/description')
  @ApiOperation({ summary: 'تولید توضیح SEO با هوش مصنوعی' })
  async generateDescription(@Body() data: { entityType: string; entityId: string; context: string }) {
    return this.service.generateSeoDescription(data.entityType, data.entityId, data.context);
  }

  @Post('generate/faq')
  @ApiOperation({ summary: 'تولید سوالات متداول با هوش مصنوعی' })
  async generateFaq(@Body() data: { entityType: string; entityId: string; context: string }) {
    return this.service.generateFaq(data.entityType, data.entityId, data.context);
  }

  @Post('generate/seo-page')
  @Roles('admin', 'super_admin', 'seo_manager')
  @ApiOperation({ summary: 'تولید صفحه SEO کامل با هوش مصنوعی' })
  async generateSeoPage(@Body() data: { categoryName: string; cityName: string }) {
    return this.service.generateSeoPage(data.categoryName, data.cityName);
  }

  @Post('detect-spam')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'تشخیص اسپم در نظر' })
  async detectSpam(@Body('reviewText') reviewText: string) {
    return this.service.detectSpam(reviewText);
  }

  @Post('calculate-ranking/:businessId')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'محاسبه امتیاز رتبه‌بندی کسب‌وکار' })
  async calculateRanking(@Body('businessId') businessId: string) {
    await this.service.calculateRankingScore(businessId);
    return { success: true };
  }
}
