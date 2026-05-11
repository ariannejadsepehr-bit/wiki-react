import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../common/prisma.module';
import { ZarinpalGateway } from './gateways/zarinpal.gateway';
import { IdpayGateway } from './gateways/idpay.gateway';
import { NextpayGateway } from './gateways/nextpay.gateway';

@Module({
  imports: [PrismaModule, ConfigModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, ZarinpalGateway, IdpayGateway, NextpayGateway],
})
export class PaymentsModule {}
