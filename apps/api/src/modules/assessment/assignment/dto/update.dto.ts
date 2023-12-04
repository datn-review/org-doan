import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAssignmentDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
