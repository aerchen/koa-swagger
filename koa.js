'use strict';

var fs = require('fs'),
    path = require('path'),
    koa = require('koa');

var app = new koa();
var jsyaml = require('js-yaml');


// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

app.use(async (ctx, next) => {
  await next().catch(console.error.bind(null, 'errorHandler'));
});

// Serve the Swagger documents and Swagger UI
app.use(require('./koa-swagger-ui')(swaggerDoc));

app.use(async (ctx, next) => {
  ctx.body = ctx.request;
});

var serverPort = 8090;
// Start the server
app.listen(serverPort, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
  console.log('Swagger-ui is available on http://localhost:%d/docs/', serverPort);
});


