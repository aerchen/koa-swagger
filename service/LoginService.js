'use strict';


/**
 * 管理员登录
 *
 * body Body  (optional)
 * returns inline_response_200
 **/
exports.loginPOST = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "expires" : 0,
  "scopes" : "",
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

