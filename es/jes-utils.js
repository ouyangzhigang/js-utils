var anObject = require('./_an-object');

var toObject = require('./_to-object');

var toLength = require('./_to-length');

var toInteger = require('./_to-integer');

var advanceStringIndex = require('./_advance-string-index');

var regExpExec = require('./_regexp-exec-abstract');

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative($replace, regexp, this, replaceValue);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max(min(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
});

var isRegExp = require('./_is-regexp');

var anObject$1 = require('./_an-object');

var speciesConstructor = require('./_species-constructor');

var advanceStringIndex$1 = require('./_advance-string-index');

var toLength$1 = require('./_to-length');

var callRegExpExec = require('./_regexp-exec-abstract');

var regexpExec = require('./_regexp-exec');

var fails = require('./_fails');

var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
}); // @@split logic

require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;

  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return []; // If `separator` is not a regex, use native split

      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }

        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }

      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    }; // Chakra, V8

  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = defined(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
    if (res.done) return res.value;
    var rx = anObject$1(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = $min(toLength$1(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex$1(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
});

var anObject$2 = require('./_an-object');

var sameValue = require('./_same-value');

var regExpExec$1 = require('./_regexp-exec-abstract'); // @@search logic


require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [// `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative($search, regexp, this);
    if (res.done) return res.value;
    var rx = anObject$2(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regExpExec$1(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});

var anObject$3 = require('./_an-object');

var toLength$2 = require('./_to-length');

var advanceStringIndex$2 = require('./_advance-string-index');

var regExpExec$2 = require('./_regexp-exec-abstract'); // @@match logic


require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative($match, regexp, this);
    if (res.done) return res.value;
    var rx = anObject$3(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec$2(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec$2(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$2(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

var global = require('./_global');

var inheritIfRequired = require('./_inherit-if-required');

var dP = require('./_object-dp').f;

var gOPN = require('./_object-gopn').f;

var isRegExp$1 = require('./_is-regexp');

var $flags = require('./_flags');

var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g; // "new" creates a new object, old webkit buggy here

var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false; // RegExp constructor can alter flags and IsRegExp works correct with @@match

  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp$1(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };

  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () {
        return Base[key];
      },
      set: function (it) {
        Base[key] = it;
      }
    });
  };

  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);

  proto.constructor = $RegExp;
  $RegExp.prototype = proto;

  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

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

/** 正则匹配数据验证 */

/**
 * 验证不能包含字母
 * @param { string } - value
 * @returns { boolean } - true/false
 */
var isNoWord = function isNoWord(value) {
  return /^[^A-Za-z]*$/g.test(value);
};
/**
 * 验证中文和数字
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isCHNAndEN = function isCHNAndEN(value) {
  return /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(value);
};
/**
 * 验证邮政编码(中国)
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isPostcode = function isPostcode(value) {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(value);
};
/**
 * 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isWeChatNum = function isWeChatNum(value) {
  return /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(value);
};
/**
 * 验证16进制颜色
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isColor16 = function isColor16(value) {
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(value);
};
/**
 * @description 验证手机机身码(IMEI)
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isIMEI = function isIMEI(value) {
  return /^\d{15,17}$/g.test(value);
};
/**
 * 验证必须带端口号的网址(或ip)
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isHttpAndPort = function isHttpAndPort(value) {
  return /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/g.test(value);
};
/**
 * 验证网址(支持端口和"?+参数"和"#+参数)
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isRightWebsite = function isRightWebsite(value) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(value);
};
/**
 * 验证英文姓名
 * @param { string } value
 * @returns { boolean } - true/false
 */

var isEnglishName = function isEnglishName(value) {
  return /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(value);
};
/**
 * 验证中文姓名
 * @param { string } value
 */

var isChineseName = function isChineseName(value) {
  return /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(value);
};
/**
 * 验证图片链接地址（图片格式可按需增删）
 * @param { string } value
 */

var isImageUrl = function isImageUrl(value) {
  return /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(value);
};
/**
 * 验证版本号格式必须为X.Y.Z
 * @param { string } value
 */

var isVersion = function isVersion(value) {
  return /^\d+(?:\.\d+){2}$/g.test(value);
};
/**
 * 验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）
 * @param { string } value
 */

var isAccountNumber = function isAccountNumber(value) {
  return /^[1-9]\d{9,29}$/g.test(value);
};
/**
 * 验证车牌号(新能源/非新能源)
 * @param { string } - value
 * @param { string } - type(new/normal/default)
 */

var isLicensePlateNumberNER = function isLicensePlateNumberNER(value, type) {
  var verifyResult = null;
  var NEW_CARD_BRAND_REGEX = /[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))$/g;
  var OLD_CARD_BRAND_REGEX = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g;

  switch (type) {
    // 新能源
    case 'new':
      verifyResult = NEW_CARD_BRAND_REGEX.test(value);
      break;

    case 'normal':
      verifyResult = OLD_CARD_BRAND_REGEX.test(value);
      break;

    default:
      verifyResult = NEW_CARD_BRAND_REGEX.test(value) || OLD_CARD_BRAND_REGEX.test(value);
      break;
  }

  return verifyResult;
};
/**
 * 验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段
 * @param { string } - value
 * @param { string } - isStrict 是否严格模式验证
 */

var isMPN = function isMPN(value, isStrict) {
  if (isStrict) {
    return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(value);
  }

  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(value);
};
/**
 * 验证座机电话(国内),如: 0341-86091234
 * @param { string } value
 */

var isLandlineTelephone = function isLandlineTelephone(value) {
  return /\d{3}-\d{8}|\d{4}-\d{7}/g.test(value);
};
/**
 * 验证身份证号, 支持1/2代(15位/18位数字)
 * @param { string } value
 */

var isIDCard = function isIDCard(value) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(value);
};
/**
 * 验证护照（包含香港、澳门）
 * @param { string } value
 */

var isPassport = function isPassport(value) {
  return /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(value);
};
/**
 * 验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
 * @param { string } value
 */

var isWebAccount = function isWebAccount(value) {
  return /^[a-zA-Z]\w{4,15}$/g.test(value);
};
/**
 * 验证中文/汉字
 * @param { string } value
 */

var isChineseCharacter = function isChineseCharacter(value) {
  return /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/g.test(value);
};
/**
 * 验证qq号格式
 * @param { string } value
 */

var isQQNum = function isQQNum(value) {
  return /^[1-9][0-9]{4,10}$/g.test(value);
};
/**
 * 验证数字和字母组成
 * @param { string } value
 */

var isNumAndStr = function isNumAndStr(value) {
  return /^[A-Za-z0-9]+$/g.test(value);
};

var Regex = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isNoWord: isNoWord,
  isCHNAndEN: isCHNAndEN,
  isPostcode: isPostcode,
  isWeChatNum: isWeChatNum,
  isColor16: isColor16,
  isIMEI: isIMEI,
  isHttpAndPort: isHttpAndPort,
  isRightWebsite: isRightWebsite,
  isEnglishName: isEnglishName,
  isChineseName: isChineseName,
  isImageUrl: isImageUrl,
  isVersion: isVersion,
  isAccountNumber: isAccountNumber,
  isLicensePlateNumberNER: isLicensePlateNumberNER,
  isMPN: isMPN,
  isLandlineTelephone: isLandlineTelephone,
  isIDCard: isIDCard,
  isPassport: isPassport,
  isWebAccount: isWebAccount,
  isChineseCharacter: isChineseCharacter,
  isQQNum: isQQNum,
  isNumAndStr: isNumAndStr
});

var LIBRARY = require('./_library');

var global$1 = require('./_global');

var ctx = require('./_ctx');

var classof = require('./_classof');

var $export = require('./_export');

var isObject$1 = require('./_is-object');

var aFunction = require('./_a-function');

var anInstance = require('./_an-instance');

var forOf = require('./_for-of');

var speciesConstructor$1 = require('./_species-constructor');

var task = require('./_task').set;

var microtask = require('./_microtask')();

var newPromiseCapabilityModule = require('./_new-promise-capability');

var perform = require('./_perform');

var userAgent = require('./_user-agent');

var promiseResolve = require('./_promise-resolve');

var PROMISE = 'Promise';
var TypeError = global$1.TypeError;
var process = global$1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global$1[PROMISE];
var isNode = classof(process) == 'process';

var empty = function () {
  /* empty */
};

var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;
var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);

    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    }; // unhandled rejections tracking support, NodeJS Promise without it fails @@species test


    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {
    /* empty */
  }
}(); // helpers

var isThenable = function (it) {
  var then;
  return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;

    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };

    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach


    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};

var onUnhandled = function (promise) {
  task.call(global$1, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;

    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global$1.onunhandledrejection) {
          handler({
            promise: promise,
            reason: value
          });
        } else if ((console = global$1.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }

    promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};

var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};

var onHandleUnhandled = function (promise) {
  task.call(global$1, function () {
    var handler;

    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global$1.onrejectionhandled) {
      handler({
        promise: promise,
        reason: promise._v
      });
    }
  });
};

var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};

var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");

    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = {
          _w: promise,
          _d: false
        }; // wrap

        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({
      _w: promise,
      _d: false
    }, e); // wrap
  }
}; // constructor polyfill


if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);

    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions

    this._a = undefined; // <- checked in isUnhandled reactions

    this._s = 0; // <- state

    this._d = false; // <- done

    this._v = undefined; // <- value

    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled

    this._n = false; // <- notify
  };

  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor$1(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;

      this._c.push(reaction);

      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {
  Promise: $Promise
});

require('./_set-to-string-tag')($Promise, PROMISE);

require('./_set-species')(PROMISE);

Wrapper = require('./_core')[PROMISE]; // statics

$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

var classof$1 = require('./_classof');

var test = {};
test[require('./_wks')('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof$1(this) + ']';
  }, true);
}

require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

var dP$1 = require('./_object-dp').f;

var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // 19.2.4.2 name

NAME in FProto || require('./_descriptors') && dP$1(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
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

// https://github.com/tc39/proposal-object-values-entries
var $export$1 = require('./_export');

var $values = require('./_object-to-array')(false);

$export$1($export$1.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

var $iterators = require('./es6.array.iterator');

var getKeys = require('./_object-keys');

var redefine = require('./_redefine');

var global$2 = require('./_global');

var hide = require('./_hide');

var Iterators = require('./_iterators');

var wks = require('./_wks');

var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;
var DOMIterables = {
  CSSRuleList: true,
  // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true,
  // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true,
  // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
  var NAME$1 = collections[i$1];
  var explicit = DOMIterables[NAME$1];
  var Collection = global$2[NAME$1];
  var proto$1 = Collection && Collection.prototype;
  var key;

  if (proto$1) {
    if (!proto$1[ITERATOR]) hide(proto$1, ITERATOR, ArrayValues);
    if (!proto$1[TO_STRING_TAG]) hide(proto$1, TO_STRING_TAG, NAME$1);
    Iterators[NAME$1] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto$1[key]) redefine(proto$1, key, $iterators[key], true);
  }
}

/** client */

/**
 * @function checkBrowser
 * 判断是浏览器内核
 */
var checkBrowser = function checkBrowser() {
  var u = navigator.userAgent;
  var obj = {
    trident: u.indexOf("Trident") > -1,
    //IE内核
    presto: u.indexOf("Presto") > -1,
    //opera内核
    webKit: u.indexOf("AppleWebKit") > -1,
    //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1 //火狐内核

  };
  return Object.keys(obj)[Object.values(obj).indexOf(true)];
};
/**
 * 判断是终端类型,值有ios,android,iPad
 */

var checkIosAndroidIpad = function checkIosAndroidIpad() {
  var u = navigator.userAgent;
  var obj = {
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
    //android终端或者uc浏览器
    iPad: u.indexOf("iPad") > -1 //是否iPad

  };
  return Object.keys(obj)[Object.values(obj).indexOf(true)];
};
/**
 * 判断是否是微信,qq 或 uc
 */

var checkWeixinQqUc = function checkWeixinQqUc() {
  var u = navigator.userAgent;
  var obj = {
    weixin: u.indexOf("MicroMessenger") > -1,
    //是否微信
    qq: u.match(/QQ/i) == "qq" && !u.indexOf('MQQBrowser') > -1,
    //是否QQ
    uc: u.indexOf('UCBrowser') > -1
  };
  return Object.keys(obj)[Object.values(obj).indexOf(true)];
};
/**
 * 检查是否是 IphoneX
 */

var checkIsIphoneX = function checkIsIphoneX() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  if (isIOS && screen.height >= 812) {
    return true;
  }
};
/**
 * Windows根据详细版本号判断当前系统名称
 * @param { string } osVersion 
 */

function OutOsName(osVersion) {
  if (!osVersion) {
    return;
  }

  var str = osVersion.substr(0, 3);

  if (str === "5.0") {
    return "Win 2000";
  } else if (str === "5.1") {
    return "Win XP";
  } else if (str === "5.2") {
    return "Win XP64";
  } else if (str === "6.0") {
    return "Win Vista";
  } else if (str === "6.1") {
    return "Win 7";
  } else if (str === "6.2") {
    return "Win 8";
  } else if (str === "6.3") {
    return "Win 8.1";
  } else if (str === "10.") {
    return "Win 10";
  } else {
    return "Win";
  }
}
/**
 * 检测移动/PC设备
 * @function detectDeviceType
 */

var detectDeviceType = function detectDeviceType() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
};

var Client = /*#__PURE__*/Object.freeze({
  __proto__: null,
  checkBrowser: checkBrowser,
  checkIosAndroidIpad: checkIosAndroidIpad,
  checkWeixinQqUc: checkWeixinQqUc,
  checkIsIphoneX: checkIsIphoneX,
  OutOsName: OutOsName,
  detectDeviceType: detectDeviceType
});

require('./es6.regexp.flags');

var anObject$4 = require('./_an-object');

var $flags$1 = require('./_flags');

var DESCRIPTORS = require('./_descriptors');

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
}; // 21.2.5.14 RegExp.prototype.toString()


if (require('./_fails')(function () {
  return $toString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject$4(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags$1.call(R) : undefined);
  }); // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/** calculator */

/**
 * 金钱格式化，三位加逗号
 * @param { number } num
 */
var formatMoney = function formatMoney(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
/**
 * 递归生成树形结构
 * @export
 * @param {*} data
 * @param {*} pid
 * @param {string} [pidName='parentId']
 * @param {string} [idName='id']
 * @param {string} [childrenName='children']
 * @param {string} - key
 * @returns { array }
 */

function getTreeData(data, pid) {
  var pidName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'parentId';
  var idName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'id';
  var childrenName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'children';
  var key = arguments.length > 5 ? arguments[5] : undefined;
  var arr = [];

  for (var i = 0; i < data.length; i++) {
    if (data[i][pidName] == pid) {
      data[i][key] = data[i][idName];
      data[i][childrenName] = getTreeData(data, data[i][idName], pidName, idName, childrenName);
      arr.push(data[i]);
    }
  }

  return arr;
}
/** 
 * 查询数组中是否存在某个元素并返回元素第一次出现的下标
 * @param {*} item 
 * @param { array } data
 */

function inArray(item, data) {
  for (var i = 0; i < data.length; i++) {
    if (item === data[i]) {
      return i;
    }
  }

  return -1;
}
/**
 * 数组中某元素出现的次数
 * @param { array } arr
 * @param {*} value
 */

function countOccurrences(arr, value) {
  return arr.reduce(function (a, v) {
    return v === value ? a + 1 : a + 0;
  }, 0);
}

var Cal = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatMoney: formatMoney,
  getTreeData: getTreeData,
  inArray: inArray,
  countOccurrences: countOccurrences
});

export { Bower, Cal, Client, Common, _Date as Dater, Dom, File$1 as File, Regex, Storage };
