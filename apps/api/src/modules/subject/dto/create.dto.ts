import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  nameVI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsNotEmpty()
  nameEN: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  descriptionVI: string;

  @ApiProperty({ type: 'string', example: '1' })
  @IsOptional()
  descriptionEN: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
