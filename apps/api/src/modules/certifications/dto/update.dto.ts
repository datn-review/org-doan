import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCertificationsDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCertificationsDto extends PartialType(CreateCertificationsDto) {
  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  name_VI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  name_EN: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  description_VI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  description_EN: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
