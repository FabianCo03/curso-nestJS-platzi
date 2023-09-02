// CONTROLADOR DE PRODUCT.SERVICE
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  getProducts(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('limit') _limit = 100,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('offset') _offset = 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query('brand') _brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   return this.productsService.create(payload);
  // }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() payload: UpdateProductDto,
  // ) {
  //   return this.productsService.update(id, payload);
  // }
  // @Delete(':id')
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.productsService.remove(id);
  // }
}
