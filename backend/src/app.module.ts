import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BusinessesModule } from './businesses/businesses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { SeoModule } from './seo/seo.module';
import { PaymentsModule } from './payments/payments.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    BusinessesModule,
    ReviewsModule,
    SeoModule,
    PaymentsModule,
    AiModule,
  ],
})
export class AppModule {}
