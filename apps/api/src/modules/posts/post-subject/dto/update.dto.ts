import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostSubjectDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostSubjectDto extends PartialType(CreatePostSubjectDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
