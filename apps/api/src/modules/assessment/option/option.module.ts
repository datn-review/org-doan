import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { Option } from './entities/option.entity';
import { OptionController } from './option.controller';
import { OptionService } from './option.service';

@Module({
  imports: [TypeOrmModule.forFeature([Option])],
  controllers: [OptionController],
  providers: [IsExist, IsNotExist, OptionService],
  exports: [OptionService],
})
export class OptionModule {}
