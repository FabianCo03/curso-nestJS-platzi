import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
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
}
