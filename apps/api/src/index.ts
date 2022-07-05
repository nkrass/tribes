import { config } from 'dotenv';
if (process.env.NODE_ENV === 'production'){
  config({path: '.env.production'});
} else config({path: '.env.dev'});
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyHandler, Handler } from 'aws-lambda';
import express = require('express');
import { AppModule } from './app/app.module';
// import { createServer, proxy, Response } from 'aws-serverless-express';

let cachedServer: Handler;

const bootstrapServer = async (): Promise<any> => {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.enableCors();
  await app.init();
  return serverlessExpress({
    app: expressApp,
  })
};

export async function handler (
  event,
  context,
  callback,
) {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context, callback);
};