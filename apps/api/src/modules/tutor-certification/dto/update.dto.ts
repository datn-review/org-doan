import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTutorCertificationDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Certifications } from 'src/modules/certifications/entities/certifications.entity';
import { User } from 'src/users/entities/user.entity';

export class UpdateTutorCertificationDto extends PartialType(CreateTutorCertificationDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  tutor?: User | null;

  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  certification?: Certifications | null;

  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerName_VN: string;
  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerName_EN: string;
  @ApiProperty({ type: String, example: 'hellword' })
  @IsOptional()
  customerDes_VI: string;
  @IsOptional()
  @ApiProperty({ type: String, example: 'hellword' })
  customerDes_EN: string;
  @IsOptional()
  status?: number | undefined;
}
