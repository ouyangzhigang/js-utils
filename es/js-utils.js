import 'core-js/modules/es6.regexp.replace';
import 'core-js/modules/es6.regexp.split';
import 'core-js/modules/es6.regexp.search';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.regexp.constructor';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.object.to-string';
import 'core-js/modules/es6.typed.uint8-array';
import 'core-js/modules/es6.function.name';

/** 浏览器操作相关browser工具函数 **/

/**
 * 
 * @function currentURL
 * @name currentURL
 * @description 返回当前url
 * @returns {string}
 */
var currentURL = function currentURL() {
  return window.location.href;
};
/**
 * @function getUrlParam
 * @name getUrlParam
 * @description 获取url参数（第一种）
 * @param {string} - name
 * @param {string} - origin
 * @returns {null}
 */

function getUrlParam(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = null;

  if (origin == null) {
    r = window.location.search.substr(1).match(reg);
  } else {
    r = origin.substr(1).match(reg);
  }

  if (r != null) return decodeURIComponent(r[2]);
  return null;
}
/**
 * @function getUrlParams
 * @name getUrlParams
 * @description 获取url参数（第二种）
 * @param {*} name
 * @param {*} origin
 */

function getUrlParams(name) {
  var url = location.href;
  var temp1 = url.split('?');
  var pram = temp1[1];
  var keyValue = pram.split('&');
  var obj = {};

  for (var i = 0; i < keyValue.length; i++) {
    var item = keyValue[i].split('=');
    var key = item[0];
    var value = item[1];
    obj[key] = value;
  }

  return obj[name];
}
/**
 * @function replaceParamVal
 * @name replaceParamVal
 * @description 修改url中的参数
 * @param { string } paramName
 * @param { string } replaceWith
 */
// export function replaceParamVal(paramName,replaceWith) {
//   var oUrl = location.href.toString();
//   // var re= eval('/('+ paramName+'=)([^&]*)/gi');
//   location.href = oUrl.replace(re,paramName+'='+replaceWith);
//   return location.href;
// }

/**
 * @function funcUrlDel
 * @name funcUrlDel
 * @description 删除url中指定的参数
 * @param { string } name
 */

function funcUrlDel(name) {
  var loca = location;
  var baseUrl = loca.origin + loca.pathname + "?";
  var query = loca.search.substr(1);

  if (query.indexOf(name) > -1) {
    var obj = {};
    var arr = query.split("&");

    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }

    delete obj[name];
    var url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '').replace(/,/g, '&');
    return url;
  }
}
/**
 * @function getClientHeight
 * @name getClientHeight
 * @description 获取窗口可视范围的高度
 */

function getClientHeight() {
  var clientHeight = 0;

  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = document.body.clientHeight < document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  } else {
    clientHeight = document.body.clientHeight > document.documentElement.clientHeight ? document.body.clientHeight : document.documentElement.clientHeight;
  }

  return clientHeight;
}
/**
 * @function getPageViewWidth
 * @name getPageViewWidth
 */

function getPageViewWidth() {
  var d = document,
      a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}
/**
 * @function getPageWidth
 * @name getPageWidth
 * @description 获取窗口宽度
 */

function getPageWidth() {
  var g = document,
      a = g.body,
      f = g.documentElement,
      d = g.compatMode == "BackCompat" ? a : g.documentElement;
  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}
/**
 * @function getViewportOffset
 * @name getViewportOffset
 * @description 获取窗口尺寸
 */

function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    };
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
      // 怪异模式
      return {
        w: document.body.clientWidth,
        h: document.body.clientHeight
      };
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      };
    }
  }
}
/**
 * @function getPageScrollTop
 * @name getPageScrollTop
 * @description 获取滚动条距顶部高度
 */

function getPageScrollTop() {
  var a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}
/**
 * @function getPageScrollLeft
 * @name getPageScrollLeft
 * @description 获取滚动条距左边的高度
 * @param {*}
 */

function getPageScrollLeft() {
  var a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}
/**
 * @function launchFullscreen
 * @description 开启全屏
 * @param {*} element
 */

function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
}
/** 平滑滚动到页面顶部 */

var scrollToTop = function scrollToTop() {
  var c = document.documentElement.scrollTop || document.body.scrollTop;

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
/**
 * 打开一个窗口
 * @param { string } url
 * @param { string } windowName
 * @param { number } width
 * @param { number } height
 */

function openWindow(url, windowName, width, height) {
  var x = parseInt(screen.width / 2.0) - width / 2.0;
  var y = parseInt(screen.height / 2.0) - height / 2.0;
  var isMSIE = navigator.appName == "Microsoft Internet Explorer";

  if (isMSIE) {
    var p = "resizable=1,location=no,scrollbars=no,width=";
    p = p + width;
    p = p + ",height=";
    p = p + height;
    p = p + ",left=";
    p = p + x;
    p = p + ",top=";
    p = p + y;
    window.open(url, windowName, p);
  } else {
    var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no");
    eval("try { win.resizeTo(width, height); } catch(e) { }");
    win.focus();
  }
}
/**
 * 滚动到指定元素区域
 * @param {*} element 
 */

var smoothScroll = function smoothScroll(element) {
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  });
};
/**
 * 返回当前滚动条位置
 * @param {*} el 
 */

var getScrollPosition = function getScrollPosition() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return {
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  };
};
/**
 * 关闭全屏
 */

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
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
 * 自适应页面（rem）
 * @param { number } width
 */

function AutoResponse() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 750;
  var target = document.documentElement;
  target.clientWidth >= 600 ? target.style.fontSize = "80px" : target.style.fontSize = target.clientWidth / width * 100 + "px";
}

var Bower = /*#__PURE__*/Object.freeze({
  __proto__: null,
  currentURL: currentURL,
  getUrlParam: getUrlParam,
  getUrlParams: getUrlParams,
  funcUrlDel: funcUrlDel,
  getClientHeight: getClientHeight,
  getPageViewWidth: getPageViewWidth,
  getPageWidth: getPageWidth,
  getViewportOffset: getViewportOffset,
  getPageScrollTop: getPageScrollTop,
  getPageScrollLeft: getPageScrollLeft,
  launchFullscreen: launchFullscreen,
  scrollToTop: scrollToTop,
  openWindow: openWindow,
  smoothScroll: smoothScroll,
  getScrollPosition: getScrollPosition,
  exitFullscreen: exitFullscreen,
  getQueryString: getQueryString,
  AutoResponse: AutoResponse
});

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

function getQueryString$1(name) {
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

var Common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  deepClone: deepClone,
  isObject: isObject,
  getQueryString: getQueryString$1,
  objIsEqual: objIsEqual,
  RandomNum: RandomNum,
  randomNumInteger: randomNumInteger
});

/**
 * @function $$
 * @name dom选择器
 * @param { string } tagName
 * @return { Object } tag
 */
function $$(tagName) {
  return document.querySelector(tagName);
}
/**
 * 隐藏所有指定标签
 * 例: hide(document.querySelectorAll('img'))
 * @param { node } - el
 */

var hideTag = function hideTag() {
  for (var _len = arguments.length, el = new Array(_len), _key = 0; _key < _len; _key++) {
    el[_key] = arguments[_key];
  }

  return [].concat(el).forEach(function (e) {
    return e.style.display = 'none';
  });
};
/**
 * 返回指定元素的生效样式
 * @param { element} el  元素节点
 * @param { string } ruleName  指定元素的名称
 */

var getStyle = function getStyle(el, ruleName) {
  return getComputedStyle(el)[ruleName];
};
/**
 * 检查是否包含子元素
 * @param { element } parent
 * @param { element } child
 * 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
 */

var elementContains = function elementContains(parent, child) {
  return parent !== child && parent.contains(child);
};
/**
 * 转义html(防XSS攻击)
 * @param { string } - str - 需转义的字符串
 */

var escapeHTML = function escapeHTML(str) {
  str.replace(/[&<>'"]/g, function (tag) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag;
  });
};

var Dom = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $$: $$,
  hideTag: hideTag,
  getStyle: getStyle,
  elementContains: elementContains,
  escapeHTML: escapeHTML
});

/** file */

/**
 * file转base64
 * @param { * } - file 图片文件
 */
var fileToBase64 = function fileToBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    return e.target.result;
  };
};
/**
 * blob转file
 * @param { blob } - blob
 * @param { string } - fileName
 */

var blobToFile = function blobToFile(blob, fileName) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};
/**
 * base64转blob
 * @param { base64 } base64
 */

var base64ToBlob = function base64ToBlob(base64) {
  var arr = base64.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};
/**
 * base64转file
 * @param { base64 } - base64
 * @param { string } - filename 转换后的文件名
 */

var base64ToFile = function base64ToFile(base64, filename) {
  var arr = base64.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var suffix = mime.split('/')[1]; // 图片后缀

  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], "".concat(filename, ".").concat(suffix), {
    type: mime
  });
};
/**
 * B转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize
 */

function formatFileSize(fileSize) {
  var temp;

  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
}
/**
 * 获取文件base64编码
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */

function fileToBase64String(file) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['jpg', 'jpeg', 'png', 'gif'];
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20 * 1024 * 1024;
  var formatMsg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '文件格式不正确';
  var sizeMsg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '文件大小超出限制';
  return new Promise(function (resolve, reject) {
    // 格式过滤
    var suffix = file.type.split('/')[1].toLowerCase();
    var inFormat = false;

    for (var i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true;
        break;
      }
    }

    if (!inFormat) {
      reject(formatMsg);
    } // 大小过滤


    if (file.size > size) {
      reject(sizeMsg);
    } // 转base64字符串


    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function () {
      var res = fileReader.result;
      resolve({
        base64String: res,
        suffix: suffix
      });
      reject('异常文件，请重新选择');
    };
  });
}

var File$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  fileToBase64: fileToBase64,
  blobToFile: blobToFile,
  base64ToBlob: base64ToBlob,
  base64ToFile: base64ToFile,
  formatFileSize: formatFileSize,
  fileToBase64String: fileToBase64String
});

/** date */

/**
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
function isYesterday(val) {
  var now = new Date();
  var yesterday = new Date(now - 1000 * 60 * 60 * 24);
  var test = new Date(val);

  if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
    return true;
  } else {
    return false;
  }
}
/**
 * @param {String} - time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8'
 * @returns {Number} - 返回值为时间毫秒值
 */

function timeToTimestamp(time) {
  var date = new Date(time);
  var timestamp = date.getTime();
  return timestamp;
}
/**
 * 获取当前月天数
 * @param {String} year 年份
 * @param {String} month 月份
 */

var getMonthNum = function getMonthNum(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
};
/**
 * 
 * 时间戳转化为年月日
 * @param {date} - times - 时间戳
 * @param {string} - ymd - 格式类型(yyyy-mm-dd,yyyy/mm/dd)
 * @param {string} - hms - 可选,格式类型(hh,hh:mm,hh:mm:ss)
 * @returns {date} - data - 年月日
 * 
 */

var timesToYyMmDd = function timesToYyMmDd(times, ymd, hms) {
  var oDate = new Date(times);
  var oYear = oDate.getFullYear();
  var oMonth = oDate.getMonth() + 1;
  var oDay = oDate.getDate();
  var oHour = oDate.getHours();
  var oMin = oDate.getMinutes();
  var oSec = oDate.getSeconds();
  var oTime; // 最后拼接时间
  // 年月日格式

  switch (ymd) {
    case 'yyyy-mm-dd':
      oTime = oYear + '-' + oMonth + '-' + oDay;
      break;

    case 'yyyy/mm/dd':
      oTime = oYear + '/' + oMonth + '/' + oDay;
      break;
  } // 时分秒格式


  switch (hms) {
    case 'hh':
      oTime = ' ' + oTime + oHour;
      break;

    case 'hh:mm':
      oTime = oTime + oHour + ':' + oMin;
      break;

    case 'hh:mm:ss':
      oTime = oTime + oHour + ':' + oMin + ':' + oSec;
      break;
  }

  return oTime;
};

var _Date = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isYesterday: isYesterday,
  timeToTimestamp: timeToTimestamp,
  getMonthNum: getMonthNum,
  timesToYyMmDd: timesToYyMmDd
});

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

var Storage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cookieSet: cookieSet,
  cookieGet: cookieGet,
  cookieRemove: cookieRemove,
  sessionStorageSet: sessionStorageSet,
  sessionStorageRemove: sessionStorageRemove,
  sessionStorageGet: sessionStorageGet,
  localStorageSet: localStorageSet,
  localStorageGet: localStorageGet,
  localStorageRemove: localStorageRemove
});

export { Bower, Common as Client, Common, _Date as Dater, Dom, File$1 as File, Storage };
