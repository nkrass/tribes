'use strict';
require('source-map-support/register');
const awsServerlessExpress = require('@vendia/serverless-express');
const server = require('./dist/apps/portal/server/main.js');
let serverlessExpressInstance;

async function setup (event, context) {
  serverlessExpressInstance = awsServerlessExpress({app: server.app, resolutionMode: 'PROMISE'});
  return serverlessExpressInstance(event, context);
}
function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context);
  return setup(event, context);
}

module.exports.server = handler


