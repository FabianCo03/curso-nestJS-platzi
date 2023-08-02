import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ParamsTokenFactory } from '@nestjs/core/pipes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Esta ruta NO es dinámica
  // Las que NO son dinámicas deben ir de primis
  @Get('products/filter')
  getProductFilter() {
    return `Soy un Product Filter`;
  }

  // en @Param le decimos el nombre del atributo que queremos recibir
  @Get('products/:id')
  getProductId(@Param('id') id: string) {
    return `product ${id}`;
  }

  @Get('/products/:productId/categories/:categoryId')
  getCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return `Product id = ${productId} | Category id = ${categoryId}`;
  }

  @Get('/products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Limit -> ${limit} | Offset -> ${offset} | Brand -> ${brand}`;
  }
}
