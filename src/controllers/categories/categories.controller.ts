import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

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
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'update categories',
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id: id,
    };
  }
}
