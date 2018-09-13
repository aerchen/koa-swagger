'use strict';

var utils = require('../utils/writer.js');
var Role = require('../service/RoleService');

module.exports.rolesGET = function rolesGET (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var limit = req.swagger.params['limit'].value;
  var skip = req.swagger.params['skip'].value;
  var enable = req.swagger.params['enable'].value;
  Role.rolesGET(authorization,limit,skip,enable)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rolesIdDELETE = function rolesIdDELETE (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  Role.rolesIdDELETE(authorization,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rolesIdGET = function rolesIdGET (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  Role.rolesIdGET(authorization,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rolesIdPUT = function rolesIdPUT (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  Role.rolesIdPUT(authorization,id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rolesPOST = function rolesPOST (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var body = req.swagger.params['body'].value;
  Role.rolesPOST(authorization,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
