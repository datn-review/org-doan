import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExerciseController],
  providers: [IsExist, IsNotExist, ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
