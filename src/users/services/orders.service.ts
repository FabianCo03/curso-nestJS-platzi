import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateOrderDto, UpdateOrderDto } from '../dtos/orders.dtos'
import { Order } from '../entities/orders.entity'
import { Customer } from '../entities/customers.entity'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}

  findAll() {
    return this.orderRepo.find()
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product'],
    })
    if (!order) {
      throw new NotFoundException(`No existe id ${order}`)
    }
    return order
  }

  async create(data: CreateOrderDto) {
    const order = new Order()
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      })
      order.customer = customer
    }

    return this.orderRepo.save(order)
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id } })
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({ where: { id } })
      order.customer = customer
    }
    return this.orderRepo.save(order)
  }

  remove(id: number) {
    return this.orderRepo.delete(id)
  }
}
