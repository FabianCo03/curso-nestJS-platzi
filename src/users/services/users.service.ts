import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dtos';
import { User } from 'src/users/entities/users.entity';
import { Product } from 'src/products/entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// falta que en get orders by id, salga la orden
// import { Order } from '../entities/orders.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  findAll() {
    // aquí dentro de find puedo colocar un WHERE de MySQL
    return this.userRepo.find();
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

  create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
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
      user: user,
      email: '',
      products: await this.productRepo.find(),
    };
  }
}
