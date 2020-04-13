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
export const cookieSet = (key, value, expire) => {
  const d = new Date();
  d.setDate(d.getDate() + expire);
  document.cookie = `${key}=${value};expires=${d.toUTCString()}`
};


/**
 * cookie 获取
 * @param {String} key  属性
 */
export const cookieGet = (key) => {
  const cookieStr = unescape(document.cookie);
  const arr = cookieStr.split('; ');
  let cookieValue = '';
  for (let i = 0; i < arr.length; i++) {
      const temp = arr[i].split('=');
      if (temp[0] === key) {
          cookieValue = temp[1];
          break
      }
  }
  return cookieValue
};

/**
 * cookie 删除
 * @param {String} key  属性
 */
export const cookieRemove = (key) => {
  document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`
};

/**
 * sessionStorage 存贮某一段时间失效
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param {String} expire 过期时间,毫秒数
 */
export const sessionStorageSet = (key, value, expire) => {
  if (typeof (value) === 'object') value = JSON.stringify(value);
  sessionStorage.setItem(key, value);
  expire && setTimeout(() => {
    sessionStorage.removeItem(key)
  }, expire)
};

/**
 * sessionStorage 删除
 * @param {String} key  属性
 */
export const sessionStorageRemove = (key) => {
  sessionStorage.removeItem(key)
};

/**
 * sessionStorage 获取
 * @param {String} key  属性
 */
export const sessionStorageGet = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
};

/**
 * localStorage 存贮某一段时间失效
 * @param {String} key  属性
 * @param {*} value 存贮值
 * @param { number } expire 过期时间,毫秒数
 */
export const localStorageSet = (key, value, expire) => {
  if (typeof (value) === 'object') value = JSON.stringify(value);
  localStorage.setItem(key, value);
  expire && setTimeout(() => {
    localStorage.removeItem(key)
  }, expire)
};

/**
 * localStorage 获取
 * @param {String} key  属性
 */
export const localStorageGet = (key) => {
  return localStorage.getItem(key)
};

/**
 * localStorage 移除
 * @param {String} key  属性
 */
export const localStorageRemove = (key) => {
  localStorage.removeItem(key)
};
