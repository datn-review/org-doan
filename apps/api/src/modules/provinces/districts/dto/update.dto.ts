import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDistrictsDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateDistrictsDto extends PartialType(CreateDistrictsDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
