import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTutorSubjectGradeDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTutorSubjectGradeDto extends PartialType(CreateTutorSubjectGradeDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  gradeId: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
