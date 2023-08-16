import { Injectable, Inject } from '@nestjs/common';

// http://localhost:3000/
@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  goHome(): string {
    return `Home API_KEY| ${this.apiKey}`;
  }
}
