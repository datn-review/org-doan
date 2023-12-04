import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Question } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), OptionModule],
  controllers: [QuestionController],
  providers: [IsExist, IsNotExist, QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
