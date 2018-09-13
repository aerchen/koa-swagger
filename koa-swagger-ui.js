/*
 * The MIT License (MIT)
 */

'use strict';

var _ = require('lodash-compat');
var debug = require('debug')('koa-swagger-ui');
var fs = require('fs');
var parseurl = require('parseurl');
var path = require('path');
var serveStatic = require('koa-static');

var defaultOptions = {
  apiDocs: '/api-docs',
  swaggerUi: '/docs'
};
var staticOptions = {};

/**
 * Middleware for serving the Swagger documents and Swagger UI.
 *
 * @param {object} rlOrSO - The Swagger Object (Swagger 2.0)
 * @param {object} [options] - The configuration options
 * @param {string=/api-docs} [options.apiDocs] - The relative path to serve your Swagger documents from
 * @param {string=/docs} [options.swaggerUi] - The relative path to serve Swagger UI from
 * @param {string} [options.swaggerUiDir] - The filesystem path to your custom swagger-ui deployment to serve
 *
 * @returns the middleware function
 */
exports = module.exports = function (rlOrSO, options) {
  debug('Initializing swagger-ui middleware');

  var apiDocsCache = {}; // Swagger document endpoints cache
  var apiDocsPaths = [];
  var staticMiddleware;
  var swaggerApiDocsURL;
  var swaggerUiPath;

  // Set the defaults
  options = _.defaults(options || {}, defaultOptions);

  if (_.isUndefined(rlOrSO)) {
    throw new Error('rlOrSO is required');
  } else if (!_.isPlainObject(rlOrSO)) {
    throw new TypeError('rlOrSO must be an object');
  }

  swaggerUiPath = options.swaggerUiDir ?
    path.resolve(options.swaggerUiDir) :
    path.join(__dirname, 'swagger-ui');

  if (options.swaggerUiDir) {
    if (!fs.existsSync(swaggerUiPath)) {
      throw new Error('options.swaggerUiDir path does not exist: ' + swaggerUiPath);
    } else if (!fs.statSync(swaggerUiPath).isDirectory()) {
      throw new Error('options.swaggerUiDir path is not a directory: ' + swaggerUiPath);
    }
  }

  staticMiddleware = serveStatic(swaggerUiPath, staticOptions);

  // Sanitize values
  if (!options.apiDocs.startsWith('/')) {
    options.apiDocs = '/' + options.apiDocs;
  }
  if (options.apiDocs.charAt(options.apiDocs.length -1) === '/') {
    options.apiDocs = options.apiDocs.substring(0, options.apiDocs.length - 1);
  }
  if (!options.swaggerUi.startsWith('/')) {
    options.swaggerUi = '/' + options.swaggerUi;
  }
  if (options.swaggerUi.charAt(options.swaggerUi.length -1) === '/') {
    options.swaggerUi = options.swaggerUi.substring(0, options.swaggerUi.length - 1);
  }

  debug('  Using swagger-ui from: %s', options.swaggerUiDir ? swaggerUiPath : 'internal');
  debug('  API Docs path: %s', options.apiDocs);

  // Add the Resource Listing or SwaggerObject to the response cache
  apiDocsCache[options.apiDocs] = JSON.stringify(rlOrSO, null, 2);

  apiDocsPaths = Object.keys(apiDocsCache);

  debug('  swagger-ui path: %s', options.swaggerUi);

  return async function swaggerUI (ctx, next) {
    var path = parseurl(ctx.req).pathname;
    var isApiDocsPath = apiDocsPaths.indexOf(path) > -1;
    var isSwaggerUiPath = path === options.swaggerUi || path.indexOf(options.swaggerUi + '/') === 0;

    if (_.isUndefined(swaggerApiDocsURL)) {
      // Start with the original path
      swaggerApiDocsURL = parseurl.original(ctx.req).pathname;

      // Remove the part after the mount point
      swaggerApiDocsURL = swaggerApiDocsURL.substring(0, swaggerApiDocsURL.indexOf(ctx.req.url));

      // Add the API docs path and remove any double dashes
      swaggerApiDocsURL = ((options.swaggerUiPrefix ? options.swaggerUiPrefix : '') + swaggerApiDocsURL + options.apiDocs).replace(/\/\//g, '/');
    }

    debug('%s %s', ctx.req.method, ctx.req.url);
    debug('  Will process: %s', isApiDocsPath || isSwaggerUiPath ? 'yes' : 'no');

    if (!(isApiDocsPath || isSwaggerUiPath)) {
      await next();
      return;
    }

    if (path === options.swaggerUi) {
      ctx.redirect(options.swaggerUi + '/');
      return;
    }

    if (isApiDocsPath) {
      debug('  Serving API Docs');
      ctx.set('Content-Type', 'application/json');
      ctx.body = apiDocsCache[path];
      return;
    }

    debug('Serving swagger-ui');

    ctx.set('Swagger-API-Docs-URL', swaggerApiDocsURL);

    if (path === options.swaggerUi || path === options.swaggerUi + '/') {
      ctx.path = '/';
    } else {
      ctx.path = ctx.req.url.substring(options.swaggerUi.length);
    }

    return staticMiddleware(ctx, next);
  };
};
