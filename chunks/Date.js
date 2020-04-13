/** date */

/**
* @param  {string} val 需要验证的日期
* @return {boolean} 返回布尔值
*/
export function isYesterday(val) {
  var now = new Date();
  var yesterday = new Date(now - 1000 * 60 * 60 * 24);
  var test = new Date(val);
  if (yesterday.getYear() === test.getYear() && yesterday.getMonth() === test.getMonth() && yesterday.getDate() === test.getDate()) {
      return true;
  } else {
      return false;
  }
}

/**
 * @param {String} - time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8'
 * @returns {Number} - 返回值为时间毫秒值
 */
export function timeToTimestamp (time) {
  let date = new Date(time);
  let timestamp = date.getTime();
  return timestamp;
}

/**
 * 获取当前月天数
 * @param {String} year 年份
 * @param {String} month 月份
 */
export const getMonthNum = (year, month) => {
  var d = new Date(year, month, 0)
  return d.getDate()
}

/**
 * 
 * 时间戳转化为年月日
 * @param {date} - times - 时间戳
 * @param {string} - ymd - 格式类型(yyyy-mm-dd,yyyy/mm/dd)
 * @param {string} - hms - 可选,格式类型(hh,hh:mm,hh:mm:ss)
 * @returns {date} - data - 年月日
 * 
 */
export const timesToYyMmDd = (times, ymd,  hms) => {
  const oDate = new Date(times)
  const oYear = oDate.getFullYear()
  const oMonth = oDate.getMonth() + 1
  const oDay = oDate.getDate()
  const oHour = oDate.getHours()
  const oMin = oDate.getMinutes()
  const oSec = oDate.getSeconds()
  let oTime // 最后拼接时间
  // 年月日格式
  switch (ymd) {
    case 'yyyy-mm-dd':
      oTime = oYear + '-' + oMonth + '-' + oDay
      break
    case 'yyyy/mm/dd':
      oTime = oYear + '/' + oMonth + '/' + oDay
      break
  }
  // 时分秒格式
  switch (hms) {
    case 'hh':
      oTime = ' ' + oTime + oHour
      break
    case 'hh:mm':
      oTime = oTime + oHour + ':' + oMin
      break
    case 'hh:mm:ss':
      oTime = oTime + oHour + ':' + oMin + ':' + oSec
      break
  }
  return oTime
}

