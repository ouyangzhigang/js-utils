(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.regexp.replace')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.regexp.replace'], factory) :
  (global = global || self, factory(global.Dom = {}));
}(this, (function (exports) { 'use strict';

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

  exports.$$ = $$;
  exports.elementContains = elementContains;
  exports.escapeHTML = escapeHTML;
  exports.getStyle = getStyle;
  exports.hideTag = hideTag;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
