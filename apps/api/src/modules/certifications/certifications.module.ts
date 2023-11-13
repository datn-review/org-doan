import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Certifications } from './entities/certifications.entity';
import { CertificationsController } from './certifications.controller';
import { CertificationsService } from './certifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Certifications])],
  controllers: [CertificationsController],
  providers: [IsExist, IsNotExist, CertificationsService],
  exports: [CertificationsService],
})
export class CertificationsModule {}
