import { Module } from '@nestjs/common';
import { BusinessesModule } from './businesses.module';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { PrismaModule } from '../common/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessesController],
  providers: [BusinessesService],
  exports: [BusinessesService],
})
export class BusinessesModule {}
