import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dtos';
import { ParseIntPipe } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  get() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getId(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
