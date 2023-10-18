import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { GradeLevel } from './entities/grade-level.entity';
import { GradeLevelController } from './grade-level.controller';
import { GradeLevelService } from './grade-level.service';

@Module({
  imports: [TypeOrmModule.forFeature([GradeLevel])],
  controllers: [GradeLevelController],
  providers: [IsExist, IsNotExist, GradeLevelService],
  exports: [GradeLevelService],
})
export class GradeLevelModule {}
