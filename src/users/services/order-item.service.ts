import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dtos'
import { Order } from '../entities/orders.entity'
import { OrderItem } from '../entities/order-item.entity'
import { Product } from '../../products/entities/products.entity'

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemsRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}
  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    })
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    })

    const item = new OrderItem()
    item.order = order
    item.product = product
    item.quantity = data.quantity

    return this.itemsRepo.save(item)
  }
}
