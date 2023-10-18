import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
export class CreateBrandDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  readonly img: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly company: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
