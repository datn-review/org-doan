import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { Option } from './entities/option.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class OptionRepository {}
@Injectable()
export class OptionService extends BaseService<Option, Repository<Option>, IParams> {
  constructor(@InjectRepository(Option) repository: Repository<Option>) {
    super(repository);
  }
}
