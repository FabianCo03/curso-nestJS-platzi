import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Brand } from './entities/brands.entity'
import { BrandsController } from './controllers/brands.controller'
import { BrandsService } from './services/brands.service'
import { CategoriesController } from './controllers/categories.controller'
import { CategoriesService } from './services/categories.service'
import { Category } from './entities/categories.entity'
import { Product } from './entities/products.entity'
import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
