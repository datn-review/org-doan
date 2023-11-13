import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostCommentDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostCommentDto extends PartialType(CreatePostCommentDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
