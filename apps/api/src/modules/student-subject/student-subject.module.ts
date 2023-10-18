import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { StudentSubject } from './entities/student-subject.entity';
import { StudentSubjectController } from './student-subject.controller';
import { StudentSubjectService } from './student-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentSubject])],
  controllers: [StudentSubjectController],
  providers: [IsExist, IsNotExist, StudentSubjectService],
  exports: [StudentSubjectService],
})
export class StudentSubjectModule {}
