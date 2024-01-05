import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Notifications } from './entities/notifications.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications]), LessonsModule],
  controllers: [NotificationsController],
  providers: [IsExist, IsNotExist, NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
