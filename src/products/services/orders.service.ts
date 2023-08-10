import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from 'src/products/dtos/orders.dtos';
import { Order } from 'src/products/entities/orders.entities';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: 1,
      date: '12/04/2008',
      nameClient: 'pedro',
    },
  ];
  findAll() {
    return this.orders;
  }
  findOne(id: number) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException(`No existe id ${id}`);
    } else {
      return order;
    }
  }
  create(payload: CreateOrderDto) {
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }
  update(id: number, payload: UpdateOrderDto) {
    const order = this.findOne(id);
    if (order) {
      const index = this.orders.findIndex((item) => item.id === id);
      this.orders[index] = { ...order, ...payload };
      return this.orders[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.orders.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
