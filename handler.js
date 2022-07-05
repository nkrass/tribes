// require('source-map-support/register'
const serverlessExpress = require('@vendia/serverless-express')
const server = require('./dist/apps/portal/server/main.js');

let serverlessExpressInstance

async function setup (event, context) {
  serverlessExpressInstance = serverlessExpress({ app: server.app(), binarySettings: { isBinary: true} })
  return serverlessExpressInstance(event, context)
}

async function handler (event, context) {
  if (serverlessExpressInstance) return serverlessExpressInstance(event, context)

  return setup(event, context)
}

exports.handler = handler