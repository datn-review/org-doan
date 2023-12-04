import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChatBotDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateChatBotDto extends PartialType(CreateChatBotDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
