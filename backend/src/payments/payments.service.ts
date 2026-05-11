import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ZarinpalGateway } from './gateways/zarinpal.gateway';
import { IdpayGateway } from './gateways/idpay.gateway';
import { NextpayGateway } from './gateways/nextpay.gateway';

export interface PaymentGatewayInterface {
  requestPayment(amount: number, description: string, callbackUrl: string, metadata?: any): Promise<{ authority: string; paymentUrl: string }>;
  verifyPayment(authority: string, amount: number): Promise<{ refId: string; success: boolean }>;
}

@Injectable()
export class PaymentsService {
  private gateways: Record<string, PaymentGatewayInterface>;

  constructor(
    private prisma: PrismaService,
    private zarinpal: ZarinpalGateway,
    private idpay: IdpayGateway,
    private nextpay: NextpayGateway,
  ) {
    this.gateways = {
      zarinpal: this.zarinpal,
      idpay: this.idpay,
      nextpay: this.nextpay,
    };
  }

  async initiatePayment(data: {
    userId: string;
    businessId: string;
    amount: number;
    gateway: string;
    description: string;
    subscriptionId?: string;
  }) {
    const gw = this.gateways[data.gateway];
    if (!gw) throw new BadRequestException(`درگاه ${data.gateway} پشتیبانی نمی‌شود`);

    const callbackUrl = `${process.env.API_URL}/api/v1/payments/callback/${data.gateway}`;

    const { authority, paymentUrl } = await gw.requestPayment(
      data.amount,
      data.description,
      callbackUrl,
    );

    const payment = await this.prisma.payment.create({
      data: {
        userId: data.userId,
        businessId: data.businessId,
        subscriptionId: data.subscriptionId,
        amount: data.amount,
        gateway: data.gateway as any,
        gatewayRef: authority,
        status: 'pending',
        description: data.description,
      },
    });

    return { paymentId: payment.id, paymentUrl, authority };
  }

  async verifyPayment(gateway: string, authority: string, amount: number) {
    const gw = this.gateways[gateway];
    if (!gw) throw new BadRequestException('درگاه نامعتبر');

    const result = await gw.verifyPayment(authority, amount);

    const payment = await this.prisma.payment.findFirst({
      where: { gatewayRef: authority, gateway: gateway as any },
    });

    if (!payment) throw new BadRequestException('پرداخت یافت نشد');

    if (result.success) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'completed',
          gatewayTrackId: result.refId,
          paidAt: new Date(),
        },
      });

      if (payment.subscriptionId) {
        await this.prisma.subscription.update({
          where: { id: payment.subscriptionId },
          data: { status: 'active', startedAt: new Date() },
        });
      }
    } else {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'failed' },
      });
    }

    return result;
  }

  async getPaymentHistory(userId: string, page = 1, limit = 20) {
    const [data, total] = await Promise.all([
      this.prisma.payment.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.payment.count({ where: { userId } }),
    ]);
    return { data, meta: { page, limit, total } };
  }
}
