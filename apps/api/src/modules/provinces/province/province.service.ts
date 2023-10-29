import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ProvinceRepository {}
@Injectable()
export class ProvinceService extends BaseService<Province, Repository<Province>, IParams> {
  constructor(@InjectRepository(Province) repository: Repository<Province>) {
    super(repository);
  }
}
