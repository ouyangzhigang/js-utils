(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.Dom = {}));
}(this, (function (exports) { 'use strict';

  /**
   * @function $$
   * @name dom选择器
   * @param {*} tag
   */
  function $$(tagName) {
    return document.querySelector(tagName);
  }

  exports.$$ = $$;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
