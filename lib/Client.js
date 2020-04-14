(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Client = {}));
}(this, (function (exports) { 'use strict';

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

  // https://github.com/tc39/proposal-object-values-entries
  var $export = require('./_export');

  var $values = require('./_object-to-array')(false);

  $export($export.S, 'Object', {
    values: function values(it) {
      return $values(it);
    }
  });

  var $iterators = require('./es6.array.iterator');

  var getKeys = require('./_object-keys');

  var redefine = require('./_redefine');

  var global = require('./_global');

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

  for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
    var NAME = collections[i];
    var explicit = DOMIterables[NAME];
    var Collection = global[NAME];
    var proto = Collection && Collection.prototype;
    var key;

    if (proto) {
      if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
      if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
      Iterators[NAME] = ArrayValues;
      if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }

  var classof = require('./_classof');

  var test = {};
  test[require('./_wks')('toStringTag')] = 'z';

  if (test + '' != '[object z]') {
    require('./_redefine')(Object.prototype, 'toString', function toString() {
      return '[object ' + classof(this) + ']';
    }, true);
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

  exports.OutOsName = OutOsName;
  exports.checkBrowser = checkBrowser;
  exports.checkIosAndroidIpad = checkIosAndroidIpad;
  exports.checkIsIphoneX = checkIsIphoneX;
  exports.checkWeixinQqUc = checkWeixinQqUc;
  exports.detectDeviceType = detectDeviceType;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
