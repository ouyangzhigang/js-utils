function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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
  return obj !== null && /object|function/i.test(_typeof(obj));
}

export { deepClone, isObject };
