import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TutorSkills } from './entities/tutor-skills.entity';
import { TutorSkillsController } from './tutor-skills.controller';
import { TutorSkillsService } from './tutor-skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorSkills])],
  controllers: [TutorSkillsController],
  providers: [IsExist, IsNotExist, TutorSkillsService],
  exports: [TutorSkillsService],
})
export class TutorSkillsModule {}
