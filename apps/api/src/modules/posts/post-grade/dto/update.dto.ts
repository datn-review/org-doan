import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostGradeDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostGradeDto extends PartialType(CreatePostGradeDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
