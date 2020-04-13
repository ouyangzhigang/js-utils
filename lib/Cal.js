(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('core-js/modules/es6.regexp.to-string'), require('core-js/modules/es6.object.to-string'), require('core-js/modules/es6.regexp.replace')) :
  typeof define === 'function' && define.amd ? define(['exports', 'core-js/modules/es6.regexp.to-string', 'core-js/modules/es6.object.to-string', 'core-js/modules/es6.regexp.replace'], factory) :
  (global = global || self, factory(global.Cal = {}));
}(this, (function (exports) { 'use strict';

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

  exports.countOccurrences = countOccurrences;
  exports.formatMoney = formatMoney;
  exports.getTreeData = getTreeData;
  exports.inArray = inArray;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
