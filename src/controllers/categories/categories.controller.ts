import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  get() {
    return `Categorias`;
  }

  @Get(':id/products/:productId')
  getId(@Param('productId') productId: string, @Param('id') id: string) {
    return `category id = ${id} | product id = ${productId}`;
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear category', payload };
  }
}
