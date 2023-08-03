import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

// ese Response lo podemos usar cuando tengamos un token
import { Response } from 'express';

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
  @HttpCode(HttpStatus.OK)
  getId(@Res() response: Response, @Param('id') id: string) {
    // estilo express, bueno usarlo en algunos casos pero mejor usar decoradores
    response.status(200).send({
      message: `product ${id}`,
    });
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear producto', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'update products',
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
