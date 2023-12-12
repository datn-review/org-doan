import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
