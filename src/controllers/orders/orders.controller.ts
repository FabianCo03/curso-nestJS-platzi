import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  get() {
    return `Orders`;
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear orders', payload };
  }
}
