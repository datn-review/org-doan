import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreatePaymentDto {
  @ApiProperty({ type: Number, example: 1 })
  @IsNotEmpty()
  sender: User;

  @ApiProperty({ type: Number, example: 1 })
  @IsOptional()
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

  @IsOptional()
  @ApiProperty({ type: Date, example: 1 })
  paymentDate?: Date;

  @IsOptional()
  @ApiProperty({ type: Date, example: 1 })
  deadPaymentDate?: Date;

  @ApiProperty({ type: Number, example: 1 })
  status: number;
}
