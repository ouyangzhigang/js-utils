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
  if ('includes' in []) {
    return data.includes(item);
  }
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

/**
 * 阶乘算法 factorialize
 * @param { number } - number
 * @name factorialize
 * @returns { number } - factorialize
 */
export const factorialize = (num) => {
  if (num < 0) return -1;
  if (num === 0 || num === 1) return 1;
  if (num > 1) {
    return num * factorialize(num - 1);
  }
}

/**
 * 生成菲波那切数列 getFibonacci
 * @param { number } - number
 * @name getFibonacci
 * @returns { number } - value
 */
export const getFibonacci = (num) => {
  let fibona = [];
  let i = 0;
  while (i < num) {
    if (i <= 1) {
      fibona.push(i);
    } else {
      fibona.push(fibona[i - 1] + fibona[i - 2]);
    }
    i++;
  }
  return fibona;
}

/**
 * quick sort calculator
 * @function quickSort
 * @param { Array } - arr - 数组
 * @returns { Array } - arr - 序列后数组
 */
export const quickSort = (arr) => {
  let specimen = arr[0];
  let leftArr = [];
  let rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= specimen)
      rightArr.push(arr[i]);
    else
      leftArr.push(arr[i]);
  }
  return quickSort(leftArr).concat([specimen], quickSort(rightArr));
}

/**
 * bubble sort calculator
 * @function bubbleSort
 * @param { Array } - arr - 数组
 * @returns { Array } - arr - 序列后数组
 */
export const bubbleSort = (arr) => {
  let temp = null
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        /** console.time('bubbel') => console.timeEnd('bubbel'): 0.093994140625ms */
        // [arr[j], arr[j + 1]] = ((a, b) => [b, a])(arr[j], arr[j + 1])
        /** console.time('bubbels') => console.timeEnd('bubbels'): 0.02685546875ms */
        temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
        /**
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = swap(arr[j], arr[j+1])
              }
            }
          }
          console.timeEnd('bubbelss')
          function swap(a, b) {return [b, a]}
          bubbleSort(b)
          VM1254:10 bubbel: 0.093994140625ms
          bubbleSorts(b)
          VM1447:13 bubbels: 0.02685546875ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.025146484375ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02392578125ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02392578125ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02392578125ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.015869140625ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.015869140625ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.01708984375ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.015869140625ms
          bubbleSortss(b)
          VM1635:11 bubbelss: 0.075927734375ms
          undefined
          bubbleSortss(b)
          VM1635:11 bubbelss: 0.015869140625ms
          undefined
          bubbleSortss(b)
          VM1635:11 bubbelss: 0.016845703125ms
          undefined
          bubbleSortss(b)
          VM1635:11 bubbelss: 0.016357421875ms
          undefined
          bubbleSortss(b)
          VM1635:11 bubbelss: 0.015869140625ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.015869140625ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.01611328125ms
          undefined
          bubbleSorts(b)
          VM1447:13 bubbels: 0.01513671875ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.025146484375ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02392578125ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02685546875ms
          undefined
          bubbleSort(b)
          VM1254:10 bubbel: 0.02490234375ms
         */
      }
    }
  }
}
