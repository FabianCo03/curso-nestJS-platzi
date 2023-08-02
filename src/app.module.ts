import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';

import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CategoriesController,
    ProductsController,
    BrandsController,
    CustomersController,
    OrdersController,
    UsersController,
  ],
  providers: [AppService],
})
export class AppModule {}
