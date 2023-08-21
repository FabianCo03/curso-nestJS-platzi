import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dtos';
import { BrandsService } from '../services/brands.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsServices: BrandsService) {}
  @Get()
  get() {
    return this.brandsServices.findAll();
  }

  @Get(':id')
  getId(@Param('id', ParseIntPipe) id: number) {
    return this.brandsServices.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsServices.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsServices.update(id, payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsServices.remove(id);
  }
}
