import { Injectable } from '@nestjs/common';
import { Customer } from 'src/entities/customers.entities';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'name of customer',
      age: 20,
    },
  ];
  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    return this.customers.find((item) => item.id === id);
  }
  create(payload: any) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
}
