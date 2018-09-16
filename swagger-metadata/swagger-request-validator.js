

'use strict';

const _ = require('lodash');
const validate = require('jsonschema').validate;
const debug = require('debug')('swaggervalidator2koa');

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

    const error = {
      message: 'Validation Failed',
    };
    debug('Request validation:');
    // Validate the request

    // Validate the content type
    // TODO use self validator
    // validators.validateContentType(swagger.swaggerObject.consumes, operation.consumes, req);

    // validate params
    _.forEach(params, (param, paramName) => {
      const {value, schema} = param;
      const {valid, errors} = validate(value, schema.schema || schema);
      if(!valid) {
        debug('Validation: failed');
        debug(paramName, param, valid, errors);

        throw  {
          paramName,
          param,
          errors,
          message: 'Validation Failed',
        };
      }
    });

    await next();
  };
};
