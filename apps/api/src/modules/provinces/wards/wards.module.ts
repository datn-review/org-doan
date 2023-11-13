import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Wards } from './entities/wards.entity';
import { WardsController } from './wards.controller';
import { WardsService } from './wards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wards])],
  controllers: [WardsController],
  providers: [IsExist, IsNotExist, WardsService],
  exports: [WardsService],
})
export class WardsModule {}
