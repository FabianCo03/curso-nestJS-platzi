import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  getProducts() {
    return `Categorias`;
  }

  @Get(':id/products/:productId')
  getProductId(@Param('productId') productId: string, @Param('id') id: string) {
    return `category id = ${id} | product id = ${productId}`;
  }
}
