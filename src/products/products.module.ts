import { Module } from '@nestjs/common';

import { BrandsController } from './controllers/brands.controller';
import { BrandsService } from './services/brands.service';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  controllers: [
    ProductsController,
    CategoriesController,
    BrandsController,
    OrdersController,
  ],
  providers: [ProductsService, CategoriesService, BrandsService, OrdersService],
})
export class ProductsModule {}
