import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';

@Controller('users')
export class UsersController {
  @Get()
  get() {
    return `Users`;
  }
  @Post()
  create(@Body() payload: CreateUserDto) {
    return { message: 'Crear users', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return {
      message: 'update brands',
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
