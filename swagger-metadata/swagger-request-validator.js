/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Apigee Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

const _ = require('lodash');
const validate = require('jsonschema').validate;
const debug = require('debug')('swagger-tools:middleware:validator');

/**
 * Middleware for using Swagger information to validate API requests/responses.
 *
 * This middleware also requires that you use the swagger-metadata middleware before this middleware.  This middleware
 * also makes no attempt to work around invalid Swagger documents.
 *
 * @param {object} [options] - The middleware options
 *
 * @returns the middleware function
 */
exports = module.exports = function () {
  debug('Initializing swagger-validator middleware');

  return async function swaggerValidator ({swagger, params, method, url, req}, next) {
    // TODO check is swagger exist, if swagger not exist, use metadata middleware

    const operation = swagger ? swagger.operation : undefined;

    debug(method, url);
    debug('Will process:', _.isUndefined(operation) ? 'no' : 'yes');

    // skip validate since request not included in swagger
    if (_.isUndefined(operation)) {
      return await next();
    }

    debug('Request validation:');
    // Validate the request

    // Validate the content type
    // TODO use self validator
    // validators.validateContentType(swagger.swaggerObject.consumes, operation.consumes, req);

    // validate params
    _.forEach(params, (param, paramName) => {
      const {value, schema} = param;
      const valid = validate(value, schema.schema || schema);
      if(!valid.valid) {
        debug('Validation: failed');
        debug(paramName, param, valid);

        const err = valid.errors[0];
        err.property = err.property.replace('instance', paramName);
        throw err;
      }
    });

    await next();
  };
};
