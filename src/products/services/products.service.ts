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

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return product;
    }
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.img = data.img;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return this.productRepo.delete(id);
    }
  }
}
