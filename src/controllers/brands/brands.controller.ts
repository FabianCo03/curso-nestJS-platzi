import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  get() {
    return {
      message: 'get de brands',
    };
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear brand', payload };
  }
}
