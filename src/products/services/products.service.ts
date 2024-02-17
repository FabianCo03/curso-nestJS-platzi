import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/products.dtos'
import { Product } from '../entities/products.entity'
import { Category } from '../entities/categories.entity'
import { Brand } from '../entities/brands.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const { limit, offset } = params

      return this.productRepo.find({
        relations: ['brand'],
        // Para typeorm se llama take y skip
        take: limit,
        skip: offset,
      })
    }
    return this.productRepo.find({
      relations: ['brand'],
    })
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    })
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`)
    } else {
      return product
    }
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data)
    if (data.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: data.brandId })
      // Ese nuevo producto tendrá una marca, y le asigno la marca
      newProduct.brand = brand
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      })
      newProduct.categories = categories
    }
    return this.productRepo.save(newProduct)
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    })
    if (changes.brandId) {
      const brand = await this.brandRepo.findOneBy({ id: changes.brandId })
      product.brand = brand
    }
    if (!product) {
      throw new NotFoundException(`No existe id ${id}`)
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      })
      product.categories = categories
    }
    this.productRepo.merge(product, changes)
    return this.productRepo.save(product)
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    })

    if (!product) {
      throw new NotFoundException(`No existe id ${productId}`)
    }
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId
    )
    return this.productRepo.save(product)
  }

  async addCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    })

    if (!product) {
      throw new NotFoundException(`No existe id ${productId}`)
    }
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
      // relations: ['categories'],
    })
    if (!category) {
      throw new NotFoundException(`No existe id ${categoryId}`)
    }
    product.categories.push(category)
    return this.productRepo.save(product)
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException(`No existe id ${id}`)
    } else {
      return this.productRepo.delete(id)
    }
  }
}
