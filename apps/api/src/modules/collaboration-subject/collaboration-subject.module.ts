import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { CollaborationSubject } from './entities/collaboration-subject.entity';
import { CollaborationSubjectController } from './collaboration-subject.controller';
import { CollaborationSubjectService } from './collaboration-subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollaborationSubject])],
  controllers: [CollaborationSubjectController],
  providers: [IsExist, IsNotExist, CollaborationSubjectService],
  exports: [CollaborationSubjectService],
})
export class CollaborationSubjectModule {}
