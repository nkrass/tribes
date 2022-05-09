import 'zone.js/node';
// import { getCurrentInvoke } from '@vendia/serverless-express'
//  import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import express = require('express');
import { join } from 'path';
import { default as helmet } from 'helmet'
import { AppServerModule } from './app/app.server.module';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { env } from 'process';
// Start runtime calculation
// const start = new Date().getTime();
// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  server.options('*', cors)
  server.use(([
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.setHeader("X-Powered-By", "Engine 420");
      if (env['NODE_ENV'] !== 'production'){
        res.setHeader('Cache-Control', 'no-cache')
      } else {
        res.set('Cache-control', 'public, max-age=3600, s-maxage=3600');
      }
      next();
    },
    helmet({
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
      },
      ieNoOpen: true,
      xssFilter: true,
      frameguard: { action: 'sameorigin'},
      dnsPrefetchControl: { allow: true },
      permittedCrossDomainPolicies: { permittedPolicies: 'all' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false
    }),
    cors(),
   //  (compression as any)(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    })
  ]))  

  
  const distFolder = join(process.cwd(), 'dist/apps/portal/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  //Load routes
 //  BootstrapRoutes(app)
  // Serve static files from /browser
  // if (env['NODE_ENV'] !== 'production') {
  //   const staticFolder = join(process.cwd(), 'src/');
  //   server.get('*/static/*', express.static(staticFolder, {
  //     maxAge: '1y',
  //     index: false,
  //     etag: false,
  //     lastModified: true
  //   }))
  // }
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
    index: false,
    etag: false,
    lastModified: true
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    //do render and only then call warmup
    // const { event, context } = getCurrentInvoke()
    // do your stuff
    const http = req.headers['x-forwarded-proto'] === undefined ? 'http' : req.headers['x-forwarded-proto'];
    res.render(indexHtml, 
      { 
        req,
        res, 
        providers: [
          { provide: APP_BASE_HREF, useValue: req.baseUrl },
          // for http and cookies
          {
            provide: REQUEST,
            useValue: req,
          },
          {
            provide: RESPONSE,
            useValue: res,
          },
          // for absolute path
          {
            provide: 'ORIGIN_URL',
            useValue: `${http}://${req.headers.host}`,
          },
        ] 
      }, 
      (err, html) => {
        // if (event?.source === 'aws.events' && event["detail-type"] === 'Scheduled Event' || 
        //     event?.source === 'serverless-plugin-warmup' ||
        //     context?.custom?.source === 'serverless-plugin-warmup'
        //   ) {
        //   const end = new Date().getTime();
        //   return res.send({status: 'ok', runtime: end - start})
        // }
        //fix temp for amps
        if (req.url.endsWith('/amp')){
          const url = req.url.slice(0, req.url.length - 4)
          if (url === "") return res.redirect("/")
          else return res.redirect(url);
        }
    
        if (html) {
          // if (req.headers.host.indexOf('amazonaws.com') > 0) { 
          //   If you're serving files on temp url of api gateway you need to change the base href to your stage name
          //   html = html.replace('<base href="/', '<base href="/dev/');
          // }
          html = html.replace('7iu1vb3wcj.execute-api.eu-north-1.amazonaws.com/', 'mytribes.ru/');
          res.send(html);
        } else {
          res.send(err);
        }
      }
    );
  });
  return server;
}

function run() {
  const port = process.env['PORTAL_PORT'] || 4200;
  // Start up the Node server
  const server = app();
  server.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
  });
}
 
 // Webpack will replace 'require' with '__webpack_require__'
 // '__non_webpack_require__' is a proxy to Node 'require'
 // The below code is to ensure that the server is run only when not requiring the bundle.
 declare const __non_webpack_require__: NodeRequire;
 // const mainModule = __non_webpack_require__.main;
 const mainModule =
   typeof __non_webpack_require__ !== 'undefined'
     ? __non_webpack_require__.main
     : require.main;
 const moduleFilename = mainModule && mainModule.filename || '';
 if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
   run();
 }
 
 export * from './main.server';
 