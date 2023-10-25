import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Collaboration } from './entities/collaboration.entity';
import { CollaborationController } from './collaboration.controller';
import { CollaborationService } from './collaboration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Collaboration])],
  controllers: [CollaborationController],
  providers: [IsExist, IsNotExist, CollaborationService],
  exports: [CollaborationService],
})
export class CollaborationModule {}
