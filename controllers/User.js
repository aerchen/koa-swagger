'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.usersGET = function usersGET (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var limit = req.swagger.params['limit'].value;
  var skip = req.swagger.params['skip'].value;
  var enable = req.swagger.params['enable'].value;
  User.usersGET(authorization,limit,skip,enable)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdDELETE = function usersIdDELETE (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  User.usersIdDELETE(authorization,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdGET = function usersIdGET (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  User.usersIdGET(authorization,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersIdPUT = function usersIdPUT (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var id = req.swagger.params['id'].value;
  var body = req.swagger.params['body'].value;
  User.usersIdPUT(authorization,id,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersPOST = function usersPOST (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var body = req.swagger.params['body'].value;
  User.usersPOST(authorization,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
