import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dtos';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService
  ) {}
  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    // aquí dentro de find puedo colocar un WHERE de MySQL
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return user;
    }
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (changes.customerId) {
      const customer = await this.customersService.findOne(changes.customerId);
      user.customer = customer;
    }
    if (!user) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      this.userRepo.merge(user, changes);
      return this.userRepo.save(user);
    }
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return this.userRepo.delete(id);
    }
  }

  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }
}
