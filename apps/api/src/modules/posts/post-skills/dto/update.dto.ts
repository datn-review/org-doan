import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostSkillsDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostSkillsDto extends PartialType(CreatePostSkillsDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
