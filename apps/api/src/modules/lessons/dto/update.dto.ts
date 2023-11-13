import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLessonsDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateLessonsDto extends PartialType(CreateLessonsDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
