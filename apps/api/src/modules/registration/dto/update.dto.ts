import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRegistrationDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
