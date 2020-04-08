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