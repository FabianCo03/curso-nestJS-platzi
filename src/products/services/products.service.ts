import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandsService } from './brands.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dtos/products.dtos';
import { Product } from 'src/products/entities/products.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandsService: BrandsService,
  ) {}
  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
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

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandsService.findOne(data.brandId);
      // Ese nuevo producto tendrá una marca, y le asigno la marca
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (changes.brandId) {
      const brand = await this.brandsService.findOne(changes.brandId);
      product.brand = brand;
    }
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      this.productRepo.merge(product, changes);
      return this.productRepo.save(product);
    }
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
