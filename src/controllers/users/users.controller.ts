import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  get() {
    return `Users`;
  }
  @Post()
  create(@Body() payload: any) {
    return { message: 'Crear users', payload };
  }
}
