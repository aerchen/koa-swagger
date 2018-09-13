'use strict';


/**
 * 获取权限列表
 *
 * authorization String token
 * returns inline_response_200_1
 **/
exports.scopesGET = function(authorization) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "scope" : "all permssion of user"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

