import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Districts } from './entities/districts.entity';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Districts])],
  controllers: [DistrictsController],
  providers: [IsExist, IsNotExist, DistrictsService],
  exports: [DistrictsService],
})
export class DistrictsModule {}
