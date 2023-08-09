import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from 'src/products/dtos/brands.dtos';
import { Brand } from 'src/products/entities/brands.entities';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'name of brand',
      img: 'image',
      company: 'admin',
    },
  ];
  findAll() {
    return this.brands;
  }
  findOne(id: number) {
    return this.brands.find((item) => item.id === id);
  }
  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
}
