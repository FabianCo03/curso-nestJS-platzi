import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator'
import { ApiProperty, PartialType } from '@nestjs/swagger'
export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly img: string

  // La relación es obligatoria
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly brandId: number

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  readonly categoriesIds: number[]
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number
}
