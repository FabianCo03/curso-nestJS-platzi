import { Injectable } from '@nestjs/common';
import { Categories } from 'src/entities/categories.entities';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Categories[] = [
    {
      id: 1,
      name: 'name category',
      company: 'name company',
    },
  ];
  findAll() {
    return this.categories;
  }
  findOne(id: number) {
    return this.categories.find((item) => item.id === id);
  }
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
}
