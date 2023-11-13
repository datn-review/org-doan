import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  sender: User;

  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  receiver: User;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  amount: number;

  @IsOptional()
  @ApiProperty({ type: Number, example: 1 })
  collaboration: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1 })
  type: number;

  @ApiProperty({ type: Date, example: 1 })
  paymentDate?: Date;

  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
