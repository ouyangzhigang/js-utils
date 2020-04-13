/** 浏览器操作相关browser工具函数 **/

/**
 * 
 * @function currentURL
 * @name currentURL
 * @description 返回当前url
 * @returns {string}
 */
export const currentURL = () => window.location.href;

/**
 * @function getUrlParam
 * @name getUrlParam
 * @description 获取url参数（第一种）
 * @param {string} - name
 * @param {string} - origin
 * @returns {null}
 */
export function getUrlParam(name, origin = null) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = null;
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
export function getUrlParams(name) {
  let url = location.href;
  let temp1 = url.split('?');
  let pram = temp1[1];
  let keyValue = pram.split('&');
  let obj = {};
  for (let i = 0; i < keyValue.length; i++) {
      let item = keyValue[i].split('=');
      let key = item[0];
      let value = item[1];
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
export function funcUrlDel(name){
  var loca =location;
  var baseUrl = loca.origin + loca.pathname + "?";
  var query = loca.search.substr(1);
  if (query.indexOf(name)>-1) {
      var obj = {};
      var arr = query.split("&");
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].split("=");
          obj[arr[i][0]] = arr[i][1];
      }
      delete obj[name];
      var url = baseUrl + JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '').replace(/,/g, '&');
      return url
  }
}

/**
 * @function getClientHeight
 * @name getClientHeight
 * @description 获取窗口可视范围的高度
 */
export function getClientHeight() {
  let clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
      clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  else {
      clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
  }
  return clientHeight;
}

/**
 * @function getPageViewWidth
 * @name getPageViewWidth
 */
export function getPageViewWidth() {
  let d = document,
      a = d.compatMode == "BackCompat" ? d.body : d.documentElement;
  return a.clientWidth;
}

/**
 * @function getPageWidth
 * @name getPageWidth
 * @description 获取窗口宽度
 */
export function getPageWidth() {
  let g = document,
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
export function getViewportOffset() {
  if (window.innerWidth) {
    return {
      w: window.innerWidth,
      h: window.innerHeight
    }
  } else {
    // ie8及其以下
    if (document.compatMode === "BackCompat") {
        // 怪异模式
        return {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
    } else {
      // 标准模式
      return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      }
    }
  }
}

/**
 * @function getPageScrollTop
 * @name getPageScrollTop
 * @description 获取滚动条距顶部高度
 */
export function getPageScrollTop() {
  let a = document;
  return a.documentElement.scrollTop || a.body.scrollTop;
}

/**
 * @function getPageScrollLeft
 * @name getPageScrollLeft
 * @description 获取滚动条距左边的高度
 * @param {*}
 */
export function getPageScrollLeft() {
  let a = document;
  return a.documentElement.scrollLeft || a.body.scrollLeft;
}

/**
 * @function launchFullscreen
 * @description 开启全屏
 * @param {*} element
 */
export function launchFullscreen(element) {
  if (element.requestFullscreen) {
      element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullScreen()
  }
}

/** 平滑滚动到页面顶部 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
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
export function openWindow(url, windowName, width, height) {
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
      var win = window.open(
          url,
          "ZyiisPopup",
          "top=" +
          y +
          ",left=" +
          x +
          ",scrollbars=" +
          scrollbars +
          ",dialog=yes,modal=yes,width=" +
          width +
          ",height=" +
          height +
          ",resizable=no"
      );
      eval("try { win.resizeTo(width, height); } catch(e) { }");
      win.focus();
  }
}

/**
 * 滚动到指定元素区域
 * @param {*} element 
 */
export const smoothScroll = element =>{
  document.querySelector(element).scrollIntoView({
      behavior: 'smooth'
  });
};

/**
 * 返回当前滚动条位置
 * @param {*} el 
 */
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

/**
 * 关闭全屏
 */
export function exitFullscreen() {
  if (document.exitFullscreen) {
      document.exitFullscreen()
  } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
  }
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
 * 自适应页面（rem）
 * @param { number } width
 */
export function AutoResponse(width = 750) {
  const target = document.documentElement;
  target.clientWidth >= 600
    ? (target.style.fontSize = "80px")
    : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}

