import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
