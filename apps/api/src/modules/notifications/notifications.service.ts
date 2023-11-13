import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notifications.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class NotificationsRepository {}
@Injectable()
export class NotificationsService extends BaseService<
  Notifications,
  Repository<Notifications>,
  IParams
> {
  constructor(@InjectRepository(Notifications) repository: Repository<Notifications>) {
    super(repository);
  }
}
