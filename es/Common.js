import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.regexp.constructor';

/**
 * @function deepClone
 * @name 深拷贝
 * @param {currentObject} <object>
 * @return {cloneObj} <object>
 */
function deepClone(currentObject, isRecursive) {
  if (!isObject()) {
    return currentObject;
  }

  if (isRecursive) {
    return JSON.parse(JSON.stringify(currentObject));
  }

  var cloneObject = Array.isArray(currentObject) ? [] : {};

  for (var key in currentObject) {
    cloneObject[key] = isObject(currentObject[key]) ? arguments.callee(cloneObject[key]) : cloneObject[key];
  }

  return cloneObject;
}
/**
 * @name 是否为对象（除去null情况）
 * @function isObject
 * @param {*} obj
 * @return boolean
 */

function isObject(obj) {
  return obj !== null && /object|function/i.test(typeof obj);
}
/**
 *  获取 url 后面通过?传参的参数
 * @param {String} name
 */

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var url = window.location.href;
  var search = url.substring(url.lastIndexOf('?') + 1);
  var r = search.match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
/**
 * 判断两个对象是否相等,目前只支持对象值为简单数据类型的判断
 * @param {Object} oneObj  对象
 * @param {Object} twoObj 对象
 */

var objIsEqual = function objIsEqual(oneObj, twoObj) {
  var aProps = Object.getOwnPropertyNames(oneObj);
  var bProps = Object.getOwnPropertyNames(twoObj);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i];
    var propA = oneObj[propName];
    var propB = twoObj[propName];

    if (propA !== propB) {
      return false;
    }
  }

  return true;
};
/**
 * 生成指定范围随机数
 * @param { number } min 
 * @param { number } max 
 */

var RandomNum = function RandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * 生成随机整数
 * @export
 * @param {*} min
 * @param {*} max
 * @returns { number }
 */

function randomNumInteger(min, max) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * min + 1, 10);

    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10);

    default:
      return 0;
  }
}

export { RandomNum, deepClone, getQueryString, isObject, objIsEqual, randomNumInteger };
