import { Controller, Get, Post, Put, Param, Query, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessesService } from './businesses.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('businesses')
@Controller('businesses')
export class BusinessesController {
  constructor(private service: BusinessesService) {}

  @Get()
  @ApiOperation({ summary: 'لیست کسب‌وکارها با فیلتر و صفحه‌بندی' })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('cityId') cityId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.service.findAll({
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
      cityId: cityId ? parseInt(cityId) : undefined,
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      status,
      search,
    });
  }

  @Get(':slug')
  @ApiOperation({ summary: 'دریافت پروفایل کسب‌وکار با slug' })
  async findOne(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ثبت کسب‌وکار جدید' })
  async create(@Body() data: any, @Request() req: any) {
    return this.service.create(data, req.user.sub);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business_owner', 'admin', 'super_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'ویرایش کسب‌وکار' })
  async update(@Param('id') id: string, @Body() data: any, @Request() req: any) {
    return this.service.update(id, data, req.user.sub);
  }
}
