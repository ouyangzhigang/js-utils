/**
 * @function deepClone
 * @name 深拷贝
 * @param {currentObject} <object>
 * @return {cloneObj} <object>
 */
export function deepClone (currentObject, isRecursive) {
  if (!isObject()) {
    return currentObject
  }

  if (isRecursive) {
    return JSON.parse(JSON.stringify(currentObject))
  }

  let cloneObject = Array.isArray(currentObject) ? [] : {}
  for (let key in currentObject) {
    cloneObject[key] = isObject(currentObject[key]) ? arguments.callee(cloneObject[key]) : cloneObject[key]
  }

  return cloneObject
}

/**
 * @name 是否为对象（除去null情况）
 * @function isObject
 * @param {*} obj
 * @return boolean
 */
export function isObject (obj) {
  return obj !== null && /object|function/i.test(typeof obj)
}

/**
 *  获取 url 后面通过?传参的参数
 * @param {String} name
 */
export function getQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const url = window.location.href
  const search = url.substring(url.lastIndexOf('?') + 1)
  const r = search.match(reg)
  if (r != null) return unescape(r[2])
  return null
}

/**
 * 判断两个对象是否相等,目前只支持对象值为简单数据类型的判断
 * @param {Object} oneObj  对象
 * @param {Object} twoObj 对象
 */
export const objIsEqual = (oneObj, twoObj) => {
  const aProps = Object.getOwnPropertyNames(oneObj);
  const bProps = Object.getOwnPropertyNames(twoObj);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    let propA = oneObj[propName];
    let propB = twoObj[propName];
    if ( propA !== propB) {
      return false;
    }
  }
  return true;
}

/**
 * 生成指定范围随机数
 * @param { number } min 
 * @param { number } max 
 */
export const RandomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 生成随机整数
 * @export
 * @param {*} min
 * @param {*} max
 * @returns { number }
 */
export function randomNumInteger(min, max) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * min + 1, 10);
    case 2:
      return parseInt(Math.random() * (max - min + 1) + min, 10);
    default:
      return 0
  }
}
