import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Brand } from 'src/products/entities/brands.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dtos';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}
  findAll() {
    return this.brandRepo.find();
  }
  findOne(id: number) {
    const product = this.brandRepo.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`);
    }
    return product;
  }

  create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepo.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      this.brandRepo.merge(brand, changes);
      return this.brandRepo.save(brand);
    }
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return this.brandRepo.delete(id);
    }
  }
}
