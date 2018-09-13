'use strict';


/**
 * 获取角色列表
 *
 * authorization String token
 * limit Integer 单次返回最大数量 (optional)
 * skip Integer 从第几个开始 (optional)
 * enable Boolean token (optional)
 * returns inline_response_200_2
 **/
exports.rolesGET = function(authorization,limit,skip,enable) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "total" : 0,
  "roles" : [ {
    "enable" : true,
    "name" : "name",
    "comment" : "comment",
    "id" : "id",
    "scopes" : ""
  }, {
    "enable" : true,
    "name" : "name",
    "comment" : "comment",
    "id" : "id",
    "scopes" : ""
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 删除角色
 *
 * authorization String token
 * id String token
 * returns List
 **/
exports.rolesIdDELETE = function(authorization,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "enable" : true,
  "name" : "name",
  "comment" : "comment",
  "id" : "id",
  "scopes" : ""
}, {
  "enable" : true,
  "name" : "name",
  "comment" : "comment",
  "id" : "id",
  "scopes" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 获取角色详情
 *
 * authorization String token
 * id String token
 * returns role
 **/
exports.rolesIdGET = function(authorization,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "enable" : true,
  "name" : "name",
  "comment" : "comment",
  "id" : "id",
  "scopes" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 修改角色信息
 *
 * authorization String token
 * id String token
 * body Body_4  (optional)
 * returns role
 **/
exports.rolesIdPUT = function(authorization,id,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "enable" : true,
  "name" : "name",
  "comment" : "comment",
  "id" : "id",
  "scopes" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 添加角色
 *
 * authorization String token
 * body Body_3  (optional)
 * returns role
 **/
exports.rolesPOST = function(authorization,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "enable" : true,
  "name" : "name",
  "comment" : "comment",
  "id" : "id",
  "scopes" : ""
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

