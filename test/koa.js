'use strict';

const fs = require('fs');
const path = require('path');
const jsyaml = require('js-yaml');
const koa = require('koa');

const app = new koa();
app.use(async (ctx, next) => {
  await next().catch(err => {
    console.error('errorHandler', err);
    ctx.status = 500;
    ctx.body = err;
  });
});

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(path.join(__dirname,'../api/swagger.yaml'), 'utf8');
const swaggerDoc = jsyaml.safeLoad(spec);

const options = {
  swaggerUi: 'swagger'
};
// Serve the Swagger documents and Swagger UI
app.use(require('../swagger-ui')(swaggerDoc, options));
app.use(require('../swagger-metadata')(swaggerDoc));
const validator = require('../swagger-metadata/swagger-request-validator')();
app.use(async (ctx, next) => {
  try {
    await validator(ctx, next);
  }
  catch (err) {
    ctx.status = 400;
    ctx.body = {
      code: 40001,
      message: err.message,
      info: err,
    };
    return;
  }

  await next();
});

// request handler
app.use(async (ctx, next) => {
  //ctx.body = ctx.request;
  ctx.body = ctx.params;
});

const port = 8090;
// Start the server
app.listen(port, function () {
  console.log('Server is listening on port', port);
  console.log(`Swagger-ui is available on http://localhost:${port}/${options.swaggerUi}/`);
});


