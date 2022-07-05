import { config } from 'dotenv';
if (process.env['NODE_ENV'] === 'production'){
  config({path: '.env.production'});
} else config({path: '.env.dev'});
import serverlessExpress from '@vendia/serverless-express';
import { Handler } from 'aws-lambda';
import { app } from './ssr.server'

let cachedServer: Handler;

const bootstrapServer = async (): Promise<Handler> => {
  const expressApp = app()
  return serverlessExpress({
    app: expressApp
  });
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