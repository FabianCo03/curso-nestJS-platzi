import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto } from 'src/dtos/brands.dtos';

@Controller('brands')
export class BrandsController {
  @Get()
  get() {
    return {
      message: 'get de brands',
    };
  }
  @Post()
  create(@Body() payload: CreateBrandDto) {
    return { message: 'Crear brand', payload };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
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
