import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Assignment } from './entities/assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment])],
  controllers: [AssignmentController],
  providers: [IsExist, IsNotExist, AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
