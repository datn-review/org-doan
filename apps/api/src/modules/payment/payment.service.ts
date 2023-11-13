import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class PaymentRepository {}
@Injectable()
export class PaymentService extends BaseService<Payment, Repository<Payment>, IParams> {
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    super(repository);
  }
}
