import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateConversationDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
