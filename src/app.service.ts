import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from './config';

// http://localhost:3000/
@Injectable()
export class AppService {
  constructor(
    // estas 2 inyecciones solo se usan en appModule
    // @Inject('API_KEY') private apiKey: string,
    // @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  goHome(): string {
    const apiKey = this.configService.apikey;
    const dbName = this.configService.database.name;
    return `Home API_KEY| ${apiKey} - Database| ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
