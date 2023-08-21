import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// http://localhost:3000/
@Injectable()
export class AppService {
  constructor(
    // estas 2 inyecciones solo se usan en appModule
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[],
    private configService: ConfigService,
  ) {}
  goHome(): string {
    const apiKey = this.configService.get<string>('API_KEY');
    const dbName = this.configService.get<string>('DATABASE_NAME');
    return `Home API_KEY| ${apiKey} - Database| ${dbName}`;
  }
}
