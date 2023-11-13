import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Payment } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CollaborationModule } from '../collaboration/collaboration.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), forwardRef(() => CollaborationModule)],
  controllers: [PaymentController],
  providers: [IsExist, IsNotExist, PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
