import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  findAll() {
    // aquí dentro de find puedo colocar un WHERE de MySQL
    return this.productRepo.find();
  }
  findOne(id: number) {
    const product = this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return product;
    }
  }
  // create(payload: CreateProductDto) {
  //   this.counterId = this.counterId + 1;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }
  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   if (product) {
  //     const index = this.products.findIndex((item) => item.id === id);
  //     this.products[index] = { ...product, ...payload };
  //     return this.products[index];
  //   }
  //   return null;
  // }
  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }
}
