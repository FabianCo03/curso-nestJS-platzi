import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts() {
    return `Productos`;
  }
  @Get('/queries')
  getProductsQuery(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Limit -> ${limit} | Offset -> ${offset} | Brand -> ${brand}`;
  }
  // Esta ruta NO es dinámica
  // Las que NO son dinámicas deben ir de primis
  @Get('/filter')
  getProductFilter() {
    return `Product Filter, ruta estática`;
  }
  // en @Param le decimos el nombre del atributo que queremos recibir
  @Get(':id')
  getProductId(@Param('id') id: string) {
    return `product ${id}`;
  }
}
