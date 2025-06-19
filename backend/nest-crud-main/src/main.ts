import { NestFactory } from '@nestjs/core';
import { AppModule }   from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1) Allow Next.js on port 3000
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // 2) Global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));

  // 3) Listen on PORT env or default 3001
  const port = process.env.PORT ? +process.env.PORT : 3001;
  await app.listen(port);
  console.log(`🚀 Backend listening on http://localhost:${port}`);
}
bootstrap();
