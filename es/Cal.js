require('./es6.regexp.flags');

var anObject = require('./_an-object');

var $flags = require('./_flags');

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
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  }); // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

var classof = require('./_classof');

var test = {};
test[require('./_wks')('toStringTag')] = 'z';

if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

var anObject$1 = require('./_an-object');

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
    var rx = anObject$1(regexp);
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

export { countOccurrences, formatMoney, getTreeData, inArray };
