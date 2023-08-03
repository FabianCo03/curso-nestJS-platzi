import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get()
  get() {
    return `Customers`;
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear customers', payload };
  }
}
