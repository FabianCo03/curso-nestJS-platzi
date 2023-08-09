import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/products/dtos/orders.dtos';

@Controller('orders')
export class OrdersController {
  @Get()
  get() {
    return `Orders`;
  }
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return { message: 'Crear orders', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateOrderDto) {
    return {
      message: 'update orders',
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
