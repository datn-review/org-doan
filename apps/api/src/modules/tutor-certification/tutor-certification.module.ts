import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TutorCertification } from './entities/tutor-certification.entity';
import { TutorCertificationController } from './tutor-certification.controller';
import { TutorCertificationService } from './tutor-certification.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorCertification])],
  controllers: [TutorCertificationController],
  providers: [IsExist, IsNotExist, TutorCertificationService],
  exports: [TutorCertificationService],
})
export class TutorCertificationModule {}
