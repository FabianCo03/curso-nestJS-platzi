import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  goHome(): string {
    return this.appService.goHome();
  }
  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }
}
