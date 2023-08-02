import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Platzi Store';
  }
  getProductId(): any {
    return '';
  }
}
