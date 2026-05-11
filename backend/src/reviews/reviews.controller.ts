import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private service: ReviewsService) {}

  @Get('business/:businessId')
  @ApiOperation({ summary: 'نظرات کسب‌وکار' })
  async findByBusiness(
    @Param('businessId') businessId: string,
    @Query('page') page?: string,
  ) {
    return this.service.findByBusiness(businessId, page ? parseInt(page) : 1);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ثبت نظر جدید' })
  async create(@Body() data: { businessId: string; rating: number; title?: string; body?: string }, @Request() req: any) {
    return this.service.create({ ...data, userId: req.user.sub });
  }

  @Post(':id/respond')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'پاسخ صاحب کسب‌وکار به نظر' })
  async respond(@Param('id') id: string, @Body('body') body: string, @Body('businessId') businessId: string) {
    return this.service.respond(id, businessId, body);
  }

  @Post(':id/helpful')
  @ApiOperation({ summary: 'علامت‌گذاری نظر به عنوان مفید' })
  async markHelpful(@Param('id') id: string) {
    return this.service.markHelpful(id);
  }
}
