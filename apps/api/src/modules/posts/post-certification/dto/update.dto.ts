import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostCertificationDto } from './create.dto';
import { IsOptional } from 'class-validator';

export class UpdatePostCertificationDto extends PartialType(CreatePostCertificationDto) {
  @ApiProperty({ example: '1' })
  @IsOptional()
  name?: string | undefined;
  @ApiProperty({ example: 1 })
  @IsOptional()
  status?: number | undefined;
}
