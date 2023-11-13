import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Collaboration } from './entities/collaboration.entity';
import { CollaborationController } from './collaboration.controller';
import { CollaborationService } from './collaboration.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration]), forwardRef(() => PaymentModule)],
  controllers: [CollaborationController],
  providers: [IsExist, IsNotExist, CollaborationService],
  exports: [CollaborationService],
})
export class CollaborationModule {}
