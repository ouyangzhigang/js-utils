(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Regex = {}));
}(this, (function (exports) { 'use strict';

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

  exports.isAccountNumber = isAccountNumber;
  exports.isCHNAndEN = isCHNAndEN;
  exports.isChineseCharacter = isChineseCharacter;
  exports.isChineseName = isChineseName;
  exports.isColor16 = isColor16;
  exports.isEnglishName = isEnglishName;
  exports.isHttpAndPort = isHttpAndPort;
  exports.isIDCard = isIDCard;
  exports.isIMEI = isIMEI;
  exports.isImageUrl = isImageUrl;
  exports.isLandlineTelephone = isLandlineTelephone;
  exports.isLicensePlateNumberNER = isLicensePlateNumberNER;
  exports.isMPN = isMPN;
  exports.isNoWord = isNoWord;
  exports.isNumAndStr = isNumAndStr;
  exports.isPassport = isPassport;
  exports.isPostcode = isPostcode;
  exports.isQQNum = isQQNum;
  exports.isRightWebsite = isRightWebsite;
  exports.isVersion = isVersion;
  exports.isWeChatNum = isWeChatNum;
  exports.isWebAccount = isWebAccount;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
