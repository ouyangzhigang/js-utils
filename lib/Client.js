(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.regexp.match'), require('core-js/modules/es7.object.values'), require('core-js/modules/web.dom.iterable'), require('core-js/modules/es6.object.to-string')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.regexp.match', 'core-js/modules/es7.object.values', 'core-js/modules/web.dom.iterable', 'core-js/modules/es6.object.to-string'], factory) :
  (global = global || self, factory(global.Client = {}));
}(this, (function (exports) { 'use strict';

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
