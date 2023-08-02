import { Controller, Get, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get()
  getBrands() {
    return `Brands`;
  }
}
