import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  HttpStatus,
  HttpCode,
  Delete,
} from '@nestjs/common';

import { ProductsService } from '../../services/products/products.service';

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
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return this.productsService.findOne(+productId);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productsService.update(+id, payload);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
