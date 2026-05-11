import { Controller, Get, Post, Param, Body, Query, UseGuards, Request, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private service: PaymentsService) {}

  @Post('initiate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'شروع فرآیند پرداخت' })
  async initiate(
    @Body() data: { businessId: string; amount: number; gateway: string; description: string; subscriptionId?: string },
    @Request() req: any,
  ) {
    return this.service.initiatePayment({
      userId: req.user.sub,
      businessId: data.businessId,
      amount: data.amount,
      gateway: data.gateway,
      description: data.description,
      subscriptionId: data.subscriptionId,
    });
  }

  @Get('callback/:gateway')
  @ApiOperation({ summary: 'کال‌بک درگاه پرداخت' })
  async callback(
    @Param('gateway') gateway: string,
    @Query('Authority') authority: string,
    @Query('Amount') amount: string,
  ) {
    return this.service.verifyPayment(gateway, authority, parseInt(amount));
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'تاریخچه پرداخت‌ها' })
  async history(@Request() req: any, @Query('page') page?: string) {
    return this.service.getPaymentHistory(req.user.sub, page ? parseInt(page) : 1);
  }
}
