import { Injectable, Inject } from '@nestjs/common';

// http://localhost:3000/
@Injectable()
export class AppService {
  constructor(
    // estas 2 inyecciones solo se usan en appModule
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  goHome(): string {
    console.log(this.tasks);
    return `Home API_KEY| ${this.apiKey}`;
  }
}
