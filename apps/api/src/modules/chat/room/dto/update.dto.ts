import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
