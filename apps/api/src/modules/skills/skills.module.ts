import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Skills } from './entities/skills.entity';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skills])],
  controllers: [SkillsController],
  providers: [IsExist, IsNotExist, SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
