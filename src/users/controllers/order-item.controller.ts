import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'

import { CreateOrderItemDto } from '../dtos/order-item.dtos'
import { OrderItemService } from '../services/order-item.service'

@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload)
  }
}
