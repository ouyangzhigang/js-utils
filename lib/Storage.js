(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.regexp.split')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.regexp.split'], factory) :
  (global = global || self, factory(global.Storage = {}));
}(this, (function (exports) { 'use strict';

  /** storage */

  /**
   * cookie 存贮
   * @param {String} key  属性
   */

  /**
   * @param {String} key  属性
   * @param {*} value  值
   * @param { String } expire  过期时间,单位天
   */
  var cookieSet = function cookieSet(key, value, expire) {
    var d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = "".concat(key, "=").concat(value, ";expires=").concat(d.toUTCString());
  };
  /**
   * cookie 获取
   * @param {String} key  属性
   */

  var cookieGet = function cookieGet(key) {
    var cookieStr = unescape(document.cookie);
    var arr = cookieStr.split('; ');
    var cookieValue = '';

    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i].split('=');

      if (temp[0] === key) {
        cookieValue = temp[1];
        break;
      }
    }

    return cookieValue;
  };
  /**
   * cookie 删除
   * @param {String} key  属性
   */

  var cookieRemove = function cookieRemove(key) {
    document.cookie = "".concat(encodeURIComponent(key), "=;expires=").concat(new Date());
  };
  /**
   * sessionStorage 存贮某一段时间失效
   * @param {String} key  属性
   * @param {*} value 存贮值
   * @param {String} expire 过期时间,毫秒数
   */

  var sessionStorageSet = function sessionStorageSet(key, value, expire) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(key, value);
    expire && setTimeout(function () {
      sessionStorage.removeItem(key);
    }, expire);
  };
  /**
   * sessionStorage 删除
   * @param {String} key  属性
   */

  var sessionStorageRemove = function sessionStorageRemove(key) {
    sessionStorage.removeItem(key);
  };
  /**
   * sessionStorage 获取
   * @param {String} key  属性
   */

  var sessionStorageGet = function sessionStorageGet(key) {
    return JSON.parse(sessionStorage.getItem(key));
  };
  /**
   * localStorage 存贮某一段时间失效
   * @param {String} key  属性
   * @param {*} value 存贮值
   * @param { number } expire 过期时间,毫秒数
   */

  var localStorageSet = function localStorageSet(key, value, expire) {
    if (typeof value === 'object') value = JSON.stringify(value);
    localStorage.setItem(key, value);
    expire && setTimeout(function () {
      localStorage.removeItem(key);
    }, expire);
  };
  /**
   * localStorage 获取
   * @param {String} key  属性
   */

  var localStorageGet = function localStorageGet(key) {
    return localStorage.getItem(key);
  };
  /**
   * localStorage 移除
   * @param {String} key  属性
   */

  var localStorageRemove = function localStorageRemove(key) {
    localStorage.removeItem(key);
  };

  exports.cookieGet = cookieGet;
  exports.cookieRemove = cookieRemove;
  exports.cookieSet = cookieSet;
  exports.localStorageGet = localStorageGet;
  exports.localStorageRemove = localStorageRemove;
  exports.localStorageSet = localStorageSet;
  exports.sessionStorageGet = sessionStorageGet;
  exports.sessionStorageRemove = sessionStorageRemove;
  exports.sessionStorageSet = sessionStorageSet;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
