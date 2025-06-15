// Path: backend/src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory }     from '@nestjs/core';
import { AppModule }       from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow your Next.js front‑end (on e.g. http://localhost:3002) to call this API
  app.enableCors({
    origin: 'http://localhost:3002',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(3000);
  console.log(`🚀 Backend listening on http://localhost:3000`);
}

bootstrap();
