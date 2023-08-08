import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dtos';

@Controller('customers')
export class CustomersController {
  @Get()
  get() {
    return `Customers`;
  }
  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return { message: 'Crear customers', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateCustomerDto) {
    return {
      message: 'update customers',
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
