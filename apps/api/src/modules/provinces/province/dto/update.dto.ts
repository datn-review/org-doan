import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
