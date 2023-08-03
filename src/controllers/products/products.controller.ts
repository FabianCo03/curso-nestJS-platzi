import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  get() {
    return {
      message: 'Productos',
    };
  }
  @Get('/queries')
  getQueries(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'Marca',
  ) {
    return {
      Limit: limit,
      Offset: offset,
      Brand: brand,
    };
  }
  // Esta ruta NO es dinámica
  // Las que NO son dinámicas deben ir de primis
  @Get('/filter')
  getFilter() {
    return {
      message: `Product Filter, ruta estática`,
    };
  }
  // en @Param le decimos el nombre del atributo que queremos recibir
  @Get(':id')
  getId(@Param('id') id: string) {
    return { message: `product ${id}` };
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear producto', payload };
  }
}
