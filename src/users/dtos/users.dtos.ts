import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
