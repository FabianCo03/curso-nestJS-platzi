import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, ApiTags, PartialType } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
