import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // elimina campos extra
      whitelist: true,
      // coloca problema por campo extra
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
