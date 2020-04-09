/** 浏览器操作相关browser工具函数 **/

/**
 * 
 * @function currentURL
 * @name currentURL
 * @description 返回当前url
 * 
 */
var currentURL = function currentURL() {
  return window.location.href;
};
/**
 * @function getUrlParam
 * @name getUrlParam
 * @description 获取url参数（第一种）
 * @param {*} name
 * @param {*} origin
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

export { currentURL, funcUrlDel, getClientHeight, getPageScrollLeft, getPageScrollTop, getPageViewWidth, getPageWidth, getUrlParam, getUrlParams, getViewportOffset, launchFullscreen };
