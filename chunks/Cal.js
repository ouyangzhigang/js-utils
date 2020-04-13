/** calculator */

/**
 * 金钱格式化，三位加逗号
 * @param { number } num
 */
export const formatMoney = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
export function getTreeData(data, pid, pidName = 'parentId', idName = 'id', childrenName = 'children', key) {
  let arr = [];

  for (let i = 0; i < data.length; i++) {
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
export function inArray(item, data) {
  for (let i = 0; i < data.length; i++) {
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
export function countOccurrences(arr, value) {
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0);
}

