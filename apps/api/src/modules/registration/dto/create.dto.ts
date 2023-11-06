import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRegistrationDto {
  @ApiProperty({ type: 'Number', example: '1' })
  @IsNotEmpty()
  postsId: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
  status?: number;
}
