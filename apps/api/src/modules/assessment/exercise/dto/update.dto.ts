import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExerciseDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
