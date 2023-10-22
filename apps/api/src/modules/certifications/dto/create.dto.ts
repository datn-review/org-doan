import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCertificationsDto {
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
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
