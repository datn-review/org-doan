import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Lessons } from './entities/lessons.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { CollaborationModule } from '../collaboration/collaboration.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons]), CollaborationModule, ScheduleModule],
  controllers: [LessonsController],
  providers: [IsExist, IsNotExist, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
