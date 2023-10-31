import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { PostSkills } from './entities/post-skills.entity';
import { PostSkillsController } from './post-skills.controller';
import { PostSkillsService } from './post-skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostSkills])],
  controllers: [PostSkillsController],
  providers: [IsExist, IsNotExist, PostSkillsService],
  exports: [PostSkillsService],
})
export class PostSkillsModule {}
