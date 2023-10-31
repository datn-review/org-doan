import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { PostCertification } from './entities/post-certification.entity';
import { PostCertificationController } from './post-certification.controller';
import { PostCertificationService } from './post-certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostCertification])],
  controllers: [PostCertificationController],
  providers: [IsExist, IsNotExist, PostCertificationService],
  exports: [PostCertificationService],
})
export class PostCertificationModule {}
