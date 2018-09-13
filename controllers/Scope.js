'use strict';

var utils = require('../utils/writer.js');
var Scope = require('../service/ScopeService');

module.exports.scopesGET = function scopesGET (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  Scope.scopesGET(authorization)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
