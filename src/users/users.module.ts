import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Customer } from './entities/customers.entity';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Order } from './entities/orders.entity';
import { ProductsModule } from 'src/products/products.module';
import { User } from './entities/users.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Product } from 'src/products/entities/products.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Customer, User, Order, Product]),
    ProductsModule,
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
