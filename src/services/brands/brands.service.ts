import { Injectable } from '@nestjs/common';
import { Brand } from 'src/entities/brands.entities';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: 'name of brand',
      company: 'admin',
    },
  ];
  findAll() {
    return this.brands;
  }
  findOne(id: number) {
    return this.brands.find((item) => item.id === id);
  }
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }
}
