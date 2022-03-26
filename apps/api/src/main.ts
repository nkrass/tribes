/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
 import { config } from 'dotenv';
 if (process.env.NODE_ENV === 'production'){
   config({path: '.env.production'});
 } else config({path: '.env.dev'});
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
