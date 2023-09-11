import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../config';

const API_KEY = '1234567';
const API_KEY_PROD = 'PROD121212';

// acá estoy creando la instancia global para no importar módulos
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          database: dbName,
          username: user,
          host,
          port,
          password,
          // aquí las tablas se sincronizan con la BD y van a crear las tablas correspondientes - Está en false porque para eso están las migraciones
          synchronize: false,
          // las entidades deben ser autocargadas - el solo busca entidades que hayamos creado en nuestro código y sincronizar
          autoLoadEntities: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      // useFactory nos permite hacer inyección de dependencias
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
