import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Lessons } from './entities/lessons.entity';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lessons])],
  controllers: [LessonsController],
  providers: [IsExist, IsNotExist, LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
