import { IsDate, IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @IsDate()
  readonly date: string;

  @IsString()
  @IsNotEmpty()
  readonly nameClient: string;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
