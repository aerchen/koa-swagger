'use strict';


/**
 * 获取管理员列表
 *
 * authorization String token
 * limit Integer 单次返回最大数量 (optional)
 * skip Integer 从第几个开始 (optional)
 * enable Boolean token (optional)
 * returns user
 **/
exports.usersGET = function(authorization,limit,skip,enable) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "phone" : "phone",
  "enable" : true,
  "roles" : "",
  "name" : "name",
  "id" : "id",
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 删除管理员
 *
 * authorization String token
 * id String token
 * returns user
 **/
exports.usersIdDELETE = function(authorization,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "phone" : "phone",
  "enable" : true,
  "roles" : "",
  "name" : "name",
  "id" : "id",
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 获取用户详情
 *
 * authorization String token
 * id String token
 * returns user
 **/
exports.usersIdGET = function(authorization,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "phone" : "phone",
  "enable" : true,
  "roles" : "",
  "name" : "name",
  "id" : "id",
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 添加管理员用户
 *
 * authorization String token
 * id String token
 * body Body_2  (optional)
 * returns user
 **/
exports.usersIdPUT = function(authorization,id,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "phone" : "phone",
  "enable" : true,
  "roles" : "",
  "name" : "name",
  "id" : "id",
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * 添加管理员用户
 *
 * authorization String token
 * body Body_1  (optional)
 * returns user
 **/
exports.usersPOST = function(authorization,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "phone" : "phone",
  "enable" : true,
  "roles" : "",
  "name" : "name",
  "id" : "id",
  "userName" : "userName",
  "email" : "email"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

