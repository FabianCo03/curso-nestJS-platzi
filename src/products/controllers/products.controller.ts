// CONTROLADOR DE PRODUCT.SERVICE
import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ParseIntPipe } from '@nestjs/common'

import { ProductsService } from '../services/products.service'
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/products.dtos'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params)
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`
  }

  @Get(':productId')
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(id, payload)
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }

  @Put(':id/category/:categoryId')
  addCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.addCategoryByProduct(id, categoryId)
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId)
  }
}
