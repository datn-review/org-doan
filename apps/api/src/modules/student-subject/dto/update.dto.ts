import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateStudentSubjectDto } from './create.dto';

export class UpdateStudentSubjectDto extends PartialType(CreateStudentSubjectDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  subjectId: number;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
