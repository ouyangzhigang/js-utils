/** client */

/**
 * @function checkBrowser
 * 判断是浏览器内核
 */
export const checkBrowser = () => {
  const u = navigator.userAgent;
  const obj = {
    trident: u.indexOf("Trident") > -1, //IE内核
    presto: u.indexOf("Presto") > -1, //opera内核
    webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
    gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
 * 判断是终端类型,值有ios,android,iPad
 */
export const checkIosAndroidIpad = () => {
  const u = navigator.userAgent;
  const obj = {
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
    iPad: u.indexOf("iPad") > -1, //是否iPad
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
 * 判断是否是微信,qq 或 uc
 */
export const checkWeixinQqUc = () => {
 
  const u = navigator.userAgent;
  const obj = {
    weixin: u.indexOf("MicroMessenger") > -1, //是否微信
    qq: u.match(/QQ/i) == "qq"&&!u.indexOf('MQQBrowser') > -1, //是否QQ
    uc: u.indexOf('UCBrowser') > -1
  }
  return Object.keys(obj)[Object.values(obj).indexOf(true)]
};

/**
 * 检查是否是 IphoneX
 */
export const checkIsIphoneX = () => {
  const u = navigator.userAgent;
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS && screen.height >= 812) {
    return true;
  }
};

/**
 * Windows根据详细版本号判断当前系统名称
 * @param { string } osVersion 
 */
export function OutOsName(osVersion) {
  if(!osVersion){
      return
  }
  let str = osVersion.substr(0, 3);
  if (str === "5.0") {
      return "Win 2000"
  } else if (str === "5.1") {
      return "Win XP"
  } else if (str === "5.2") {
      return "Win XP64"
  } else if (str === "6.0") {
      return "Win Vista"
  } else if (str === "6.1") {
      return "Win 7"
  } else if (str === "6.2") {
      return "Win 8"
  } else if (str === "6.3") {
      return "Win 8.1"
  } else if (str === "10.") {
      return "Win 10"
  } else {
      return "Win"
  }
}

/**
 * 检测移动/PC设备
 * @function detectDeviceType
 */
export const detectDeviceType = () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'; };

