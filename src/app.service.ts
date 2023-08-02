import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  goHome(): string {
    return 'Home';
  }
}
