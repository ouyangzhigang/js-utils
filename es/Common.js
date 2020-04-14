var anObject = require('./_an-object');

var toLength = require('./_to-length');

var advanceStringIndex = require('./_advance-string-index');

var regExpExec = require('./_regexp-exec-abstract'); // @@match logic


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
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

var global = require('./_global');

var inheritIfRequired = require('./_inherit-if-required');

var dP = require('./_object-dp').f;

var gOPN = require('./_object-gopn').f;

var isRegExp = require('./_is-regexp');

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
    var piRE = isRegExp(p);
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
