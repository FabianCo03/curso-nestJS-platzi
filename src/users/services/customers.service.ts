import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dtos'
import { Customer } from 'src/users/entities/customers.entity'
@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>
  ) {}
  findAll() {
    return this.customerRepo.find()
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id },
    })
    if (!customer) {
      throw new NotFoundException(`No existe id ${id}`)
    } else {
      return customer
    }
  }

  create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data)
    return this.customerRepo.save(newCustomer)
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne({
      where: { id },
    })
    if (!customer) {
      throw new NotFoundException(`No existe id ${id}`)
    } else {
      this.customerRepo.merge(customer, changes)
      return this.customerRepo.save(customer)
    }
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id },
    })

    if (!customer) {
      throw new NotFoundException(`No existe id ${id}`)
    } else {
      return this.customerRepo.delete(id)
    }
  }
}
