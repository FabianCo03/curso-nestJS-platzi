import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/dtos/orders.dtos';
import { Order } from 'src/entities/orders.entities';

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
    return this.orders.find((item) => item.id === id);
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
}
