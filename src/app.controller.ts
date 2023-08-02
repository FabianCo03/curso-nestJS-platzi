import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  // con slash o sin slash Nest me lo permite
  @Get('/new')
  newRoute(): string {
    return 'new';
  }
  @Get('/ruta/')
  hello(): string {
    return 'ruta con /sas/';
  }
}
