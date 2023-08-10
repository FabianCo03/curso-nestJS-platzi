import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dtos';
import { Categories } from 'src/products/entities/categories.entities';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Categories[] = [
    {
      id: 1,
      name: 'name category',
      description: 'deportes',
    },
  ];
  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return category;
    }
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    if (category) {
      const index = this.categories.findIndex((item) => item.id === id);
      this.categories[index] = { ...category, ...payload };
      return this.categories[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
