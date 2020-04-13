js-utils collections for JavaScript
====================================

Js-utils is a front-end tool library, mainly including BOM, DOM, Regex, calculator, client, Common, Date, File, Storage, and so on. These main aspects encapsulate some Common methods.

Later on, it will be possible to integrate richer toolchains and accumulate more common methods for easier development

[![GitHub issues](https://img.shields.io/github/issues/ouyangzhigang/js-utils)](https://github.com/ouyangzhigang/js-utils/issues)
[![GitHub forks](https://img.shields.io/github/forks/ouyangzhigang/js-utils)](https://github.com/ouyangzhigang/js-utils/network)
[![GitHub stars](https://img.shields.io/github/stars/ouyangzhigang/js-utils)](https://github.com/ouyangzhigang/js-utils/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/ouyangzhigang/js-utils)](https://github.com/ouyangzhigang/js-utils/issues)
![GitHub closed issues](https://img.shields.io/github/issues-closed/ouyangzhigang/js-utils)

Installation
------------

To use with node:

```bash
$ npm install jes-utils --save
```

Then in the console:

```javascript
const Utils = require('jes-utils');
```

To use directly in the browser:

```html
<script src="path/dist/jes-utils.js"></script>
```

## Constants

<dl>
<dt><a href="#scrollToTop">scrollToTop</a></dt>
<dd><p>平滑滚动到页面顶部</p>
</dd>
<dt><a href="#smoothScroll">smoothScroll</a></dt>
<dd><p>滚动到指定元素区域</p>
</dd>
<dt><a href="#getScrollPosition">getScrollPosition</a></dt>
<dd><p>返回当前滚动条位置</p>
</dd>
<dt><a href="#formatMoney">formatMoney</a></dt>
<dd><p>金钱格式化，三位加逗号</p>
</dd>
<dt><a href="#checkIosAndroidIpad">checkIosAndroidIpad</a></dt>
<dd><p>判断是终端类型,值有ios,android,iPad</p>
</dd>
<dt><a href="#checkWeixinQqUc">checkWeixinQqUc</a></dt>
<dd><p>判断是否是微信,qq 或 uc</p>
</dd>
<dt><a href="#checkIsIphoneX">checkIsIphoneX</a></dt>
<dd><p>检查是否是 IphoneX</p>
</dd>
<dt><a href="#objIsEqual">objIsEqual</a></dt>
<dd><p>判断两个对象是否相等,目前只支持对象值为简单数据类型的判断</p>
</dd>
<dt><a href="#RandomNum">RandomNum</a></dt>
<dd><p>生成指定范围随机数</p>
</dd>
<dt><a href="#getMonthNum">getMonthNum</a></dt>
<dd><p>获取当前月天数</p>
</dd>
<dt><a href="#timesToYyMmDd">timesToYyMmDd</a> ⇒ <code>date</code></dt>
<dd><p>时间戳转化为年月日</p>
</dd>
<dt><a href="#hideTag">hideTag</a></dt>
<dd><p>隐藏所有指定标签
例: hide(document.querySelectorAll(&#39;img&#39;))</p>
</dd>
<dt><a href="#getStyle">getStyle</a></dt>
<dd><p>返回指定元素的生效样式</p>
</dd>
<dt><a href="#elementContains">elementContains</a></dt>
<dd><p>检查是否包含子元素</p>
</dd>
<dt><a href="#escapeHTML">escapeHTML</a></dt>
<dd><p>转义html(防XSS攻击)</p>
</dd>
<dt><a href="#fileToBase64">fileToBase64</a></dt>
<dd><p>file转base64</p>
</dd>
<dt><a href="#blobToFile">blobToFile</a></dt>
<dd><p>blob转file</p>
</dd>
<dt><a href="#base64ToBlob">base64ToBlob</a></dt>
<dd><p>base64转blob</p>
</dd>
<dt><a href="#base64ToFile">base64ToFile</a></dt>
<dd><p>base64转file</p>
</dd>
<dt><a href="#isNoWord">isNoWord</a> ⇒ <code>boolean</code></dt>
<dd><p>验证不能包含字母</p>
</dd>
<dt><a href="#isCHNAndEN">isCHNAndEN</a> ⇒ <code>boolean</code></dt>
<dd><p>验证中文和数字</p>
</dd>
<dt><a href="#isPostcode">isPostcode</a> ⇒ <code>boolean</code></dt>
<dd><p>验证邮政编码(中国)</p>
</dd>
<dt><a href="#isWeChatNum">isWeChatNum</a> ⇒ <code>boolean</code></dt>
<dd><p>验证微信号，6至20位，以字母开头，字母，数字，减号，下划线</p>
</dd>
<dt><a href="#isColor16">isColor16</a> ⇒ <code>boolean</code></dt>
<dd><p>验证16进制颜色</p>
</dd>
<dt><a href="#isIMEI">isIMEI</a> ⇒ <code>boolean</code></dt>
<dd><p>验证手机机身码(IMEI)</p>
</dd>
<dt><a href="#isHttpAndPort">isHttpAndPort</a> ⇒ <code>boolean</code></dt>
<dd><p>验证必须带端口号的网址(或ip)</p>
</dd>
<dt><a href="#isRightWebsite">isRightWebsite</a> ⇒ <code>boolean</code></dt>
<dd><p>验证网址(支持端口和&quot;?+参数&quot;和&quot;#+参数)</p>
</dd>
<dt><a href="#isEnglishName">isEnglishName</a> ⇒ <code>boolean</code></dt>
<dd><p>验证英文姓名</p>
</dd>
<dt><a href="#isChineseName">isChineseName</a></dt>
<dd><p>验证中文姓名</p>
</dd>
<dt><a href="#isImageUrl">isImageUrl</a></dt>
<dd><p>验证图片链接地址（图片格式可按需增删）</p>
</dd>
<dt><a href="#isVersion">isVersion</a></dt>
<dd><p>验证版本号格式必须为X.Y.Z</p>
</dd>
<dt><a href="#isAccountNumber">isAccountNumber</a></dt>
<dd><p>验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）</p>
</dd>
<dt><a href="#isLicensePlateNumberNER">isLicensePlateNumberNER</a></dt>
<dd><p>验证车牌号(新能源/非新能源)</p>
</dd>
<dt><a href="#isMPN">isMPN</a></dt>
<dd><p>验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段</p>
</dd>
<dt><a href="#isLandlineTelephone">isLandlineTelephone</a></dt>
<dd><p>验证座机电话(国内),如: 0341-86091234</p>
</dd>
<dt><a href="#isIDCard">isIDCard</a></dt>
<dd><p>验证身份证号, 支持1/2代(15位/18位数字)</p>
</dd>
<dt><a href="#isPassport">isPassport</a></dt>
<dd><p>验证护照（包含香港、澳门）</p>
</dd>
<dt><a href="#isWebAccount">isWebAccount</a></dt>
<dd><p>验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合</p>
</dd>
<dt><a href="#isChineseCharacter">isChineseCharacter</a></dt>
<dd><p>验证中文/汉字</p>
</dd>
<dt><a href="#isQQNum">isQQNum</a></dt>
<dd><p>验证qq号格式</p>
</dd>
<dt><a href="#isNumAndStr">isNumAndStr</a></dt>
<dd><p>验证数字和字母组成</p>
</dd>
<dt><a href="#cookieSet">cookieSet</a></dt>
<dd></dd>
<dt><a href="#cookieGet">cookieGet</a></dt>
<dd><p>cookie 获取</p>
</dd>
<dt><a href="#cookieRemove">cookieRemove</a></dt>
<dd><p>cookie 删除</p>
</dd>
<dt><a href="#sessionStorageSet">sessionStorageSet</a></dt>
<dd><p>sessionStorage 存贮某一段时间失效</p>
</dd>
<dt><a href="#sessionStorageRemove">sessionStorageRemove</a></dt>
<dd><p>sessionStorage 删除</p>
</dd>
<dt><a href="#sessionStorageGet">sessionStorageGet</a></dt>
<dd><p>sessionStorage 获取</p>
</dd>
<dt><a href="#localStorageSet">localStorageSet</a></dt>
<dd><p>localStorage 存贮某一段时间失效</p>
</dd>
<dt><a href="#localStorageGet">localStorageGet</a></dt>
<dd><p>localStorage 获取</p>
</dd>
<dt><a href="#localStorageRemove">localStorageRemove</a></dt>
<dd><p>localStorage 移除</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#currentURL">currentURL()</a> ⇒ <code>string</code></dt>
<dd><p>返回当前url</p>
</dd>
<dt><a href="#getUrlParam">getUrlParam()</a> ⇒ <code>null</code></dt>
<dd><p>获取url参数（第一种）</p>
</dd>
<dt><a href="#getUrlParams">getUrlParams(name, origin)</a></dt>
<dd><p>获取url参数（第二种）</p>
</dd>
<dt><a href="#replaceParamVal">replaceParamVal(paramName, replaceWith)</a></dt>
<dd><p>修改url中的参数</p>
</dd>
<dt><a href="#funcUrlDel">funcUrlDel(name)</a></dt>
<dd><p>删除url中指定的参数</p>
</dd>
<dt><a href="#getClientHeight">getClientHeight()</a></dt>
<dd><p>获取窗口可视范围的高度</p>
</dd>
<dt><a href="#getPageViewWidth">getPageViewWidth()</a></dt>
<dd></dd>
<dt><a href="#getPageWidth">getPageWidth()</a></dt>
<dd><p>获取窗口宽度</p>
</dd>
<dt><a href="#getViewportOffset">getViewportOffset()</a></dt>
<dd><p>获取窗口尺寸</p>
</dd>
<dt><a href="#getPageScrollTop">getPageScrollTop()</a></dt>
<dd><p>获取滚动条距顶部高度</p>
</dd>
<dt><a href="#getPageScrollLeft">getPageScrollLeft()</a></dt>
<dd><p>获取滚动条距左边的高度</p>
</dd>
<dt><a href="#launchFullscreen">launchFullscreen(element)</a></dt>
<dd><p>开启全屏</p>
</dd>
<dt><a href="#openWindow">openWindow(url, windowName, width, height)</a></dt>
<dd><p>打开一个窗口</p>
</dd>
<dt><a href="#exitFullscreen">exitFullscreen()</a></dt>
<dd><p>关闭全屏</p>
</dd>
<dt><a href="#getQueryString">getQueryString(name)</a></dt>
<dd><p>获取 url 后面通过?传参的参数</p>
</dd>
<dt><a href="#AutoResponse">AutoResponse(width)</a></dt>
<dd><p>自适应页面（rem）</p>
</dd>
<dt><a href="#getTreeData">getTreeData(data, pid, [pidName], [idName], [childrenName], key)</a> ⇒ <code>array</code></dt>
<dd><p>递归生成树形结构</p>
</dd>
<dt><a href="#inArray">inArray(item, data)</a></dt>
<dd><p>查询数组中是否存在某个元素并返回元素第一次出现的下标</p>
</dd>
<dt><a href="#countOccurrences">countOccurrences(arr, value)</a></dt>
<dd><p>数组中某元素出现的次数</p>
</dd>
<dt><a href="#checkBrowser
判断是浏览器内核">checkBrowser
判断是浏览器内核()</a></dt>
<dd></dd>
<dt><a href="#OutOsName">OutOsName(osVersion)</a></dt>
<dd><p>Windows根据详细版本号判断当前系统名称</p>
</dd>
<dt><a href="#detectDeviceType">detectDeviceType()</a></dt>
<dd><p>检测移动/PC设备</p>
</dd>
<dt><a href="#深拷贝">深拷贝(&lt;object&gt;)</a> ⇒ <code>cloneObj</code></dt>
<dd></dd>
<dt><a href="#isObject">isObject(obj)</a> ⇒</dt>
<dd></dd>
<dt><a href="#getQueryString">getQueryString(name)</a></dt>
<dd><p>获取 url 后面通过?传参的参数</p>
</dd>
<dt><a href="#randomNumInteger">randomNumInteger(min, max)</a> ⇒ <code>number</code></dt>
<dd><p>生成随机整数</p>
</dd>
<dt><a href="#isYesterday">isYesterday(val)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#timeToTimestamp">timeToTimestamp(time)</a> ⇒ <code>Number</code></dt>
<dd></dd>
<dt><a href="#dom选择器">dom选择器(tagName)</a> ⇒ <code>Object</code></dt>
<dd></dd>
<dt><a href="#formatFileSize">formatFileSize(fileSize)</a></dt>
<dd><p>B转换到KB,MB,GB并保留两位小数</p>
</dd>
<dt><a href="#fileToBase64String">fileToBase64String(file, format, size, formatMsg, sizeMsg)</a> ⇒ <code>Promise.&lt;any&gt;</code></dt>
<dd><p>获取文件base64编码</p>
</dd>
</dl>

<a name="scrollToTop"></a>

## scrollToTop
平滑滚动到页面顶部

**Kind**: global constant  
<a name="smoothScroll"></a>

## smoothScroll
滚动到指定元素区域

**Kind**: global constant  

| Param | Type |
| --- | --- |
| element | <code>\*</code> | 

<a name="getScrollPosition"></a>

## getScrollPosition
返回当前滚动条位置

**Kind**: global constant  

| Param | Type |
| --- | --- |
| el | <code>\*</code> | 

<a name="formatMoney"></a>

## formatMoney
金钱格式化，三位加逗号

**Kind**: global constant  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="checkIosAndroidIpad"></a>

## checkIosAndroidIpad
判断是终端类型,值有ios,android,iPad

**Kind**: global constant  
<a name="checkWeixinQqUc"></a>

## checkWeixinQqUc
判断是否是微信,qq 或 uc

**Kind**: global constant  
<a name="checkIsIphoneX"></a>

## checkIsIphoneX
检查是否是 IphoneX

**Kind**: global constant  
<a name="objIsEqual"></a>

## objIsEqual
判断两个对象是否相等,目前只支持对象值为简单数据类型的判断

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| oneObj | <code>Object</code> | 对象 |
| twoObj | <code>Object</code> | 对象 |

<a name="RandomNum"></a>

## RandomNum
生成指定范围随机数

**Kind**: global constant  

| Param | Type |
| --- | --- |
| min | <code>number</code> | 
| max | <code>number</code> | 

<a name="getMonthNum"></a>

## getMonthNum
获取当前月天数

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| year | <code>String</code> | 年份 |
| month | <code>String</code> | 月份 |

<a name="timesToYyMmDd"></a>

## timesToYyMmDd ⇒ <code>date</code>
时间戳转化为年月日

**Kind**: global constant  
**Returns**: <code>date</code> - - data - 年月日  

| Type | Description |
| --- | --- |
| <code>date</code> | times - 时间戳 |
| <code>string</code> | ymd - 格式类型(yyyy-mm-dd,yyyy/mm/dd) |
| <code>string</code> | hms - 可选,格式类型(hh,hh:mm,hh:mm:ss) |

<a name="hideTag"></a>

## hideTag
隐藏所有指定标签
例: hide(document.querySelectorAll('img'))

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>node</code> | el |

<a name="getStyle"></a>

## getStyle
返回指定元素的生效样式

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| el | <code>element</code> | 元素节点 |
| ruleName | <code>string</code> | 指定元素的名称 |

<a name="elementContains"></a>

## elementContains
检查是否包含子元素

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>element</code> |  |
| child | <code>element</code> | 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true |

<a name="escapeHTML"></a>

## escapeHTML
转义html(防XSS攻击)

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>string</code> | str - 需转义的字符串 |

<a name="fileToBase64"></a>

## fileToBase64
file转base64

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>\*</code> | file 图片文件 |

<a name="blobToFile"></a>

## blobToFile
blob转file

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>blob</code> | blob |
| <code>string</code> | fileName |

<a name="base64ToBlob"></a>

## base64ToBlob
base64转blob

**Kind**: global constant  

| Param | Type |
| --- | --- |
| base64 | <code>base64</code> | 

<a name="base64ToFile"></a>

## base64ToFile
base64转file

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>base64</code> | base64 |
| <code>string</code> | filename 转换后的文件名 |

<a name="isNoWord"></a>

## isNoWord ⇒ <code>boolean</code>
验证不能包含字母

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Type | Description |
| --- | --- |
| <code>string</code> | value |

<a name="isCHNAndEN"></a>

## isCHNAndEN ⇒ <code>boolean</code>
验证中文和数字

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isPostcode"></a>

## isPostcode ⇒ <code>boolean</code>
验证邮政编码(中国)

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isWeChatNum"></a>

## isWeChatNum ⇒ <code>boolean</code>
验证微信号，6至20位，以字母开头，字母，数字，减号，下划线

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isColor16"></a>

## isColor16 ⇒ <code>boolean</code>
验证16进制颜色

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isIMEI"></a>

## isIMEI ⇒ <code>boolean</code>
验证手机机身码(IMEI)

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isHttpAndPort"></a>

## isHttpAndPort ⇒ <code>boolean</code>
验证必须带端口号的网址(或ip)

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isRightWebsite"></a>

## isRightWebsite ⇒ <code>boolean</code>
验证网址(支持端口和"?+参数"和"#+参数)

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isEnglishName"></a>

## isEnglishName ⇒ <code>boolean</code>
验证英文姓名

**Kind**: global constant  
**Returns**: <code>boolean</code> - - true/false  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isChineseName"></a>

## isChineseName
验证中文姓名

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isImageUrl"></a>

## isImageUrl
验证图片链接地址（图片格式可按需增删）

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isVersion"></a>

## isVersion
验证版本号格式必须为X.Y.Z

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isAccountNumber"></a>

## isAccountNumber
验证银行卡号（10到30位, 覆盖对公/私账户, 参考微信支付）

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isLicensePlateNumberNER"></a>

## isLicensePlateNumberNER
验证车牌号(新能源/非新能源)

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>string</code> | value |
| <code>string</code> | type(new/normal/default) |

<a name="isMPN"></a>

## isMPN
验证手机号中国(严谨), 根据工信部2019年最新公布的手机号段

**Kind**: global constant  

| Type | Description |
| --- | --- |
| <code>string</code> | value |
| <code>string</code> | isStrict 是否严格模式验证 |

<a name="isLandlineTelephone"></a>

## isLandlineTelephone
验证座机电话(国内),如: 0341-86091234

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isIDCard"></a>

## isIDCard
验证身份证号, 支持1/2代(15位/18位数字)

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isPassport"></a>

## isPassport
验证护照（包含香港、澳门）

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isWebAccount"></a>

## isWebAccount
验证帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isChineseCharacter"></a>

## isChineseCharacter
验证中文/汉字

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isQQNum"></a>

## isQQNum
验证qq号格式

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="isNumAndStr"></a>

## isNumAndStr
验证数字和字母组成

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>string</code> | 

<a name="cookieSet"></a>

## cookieSet
**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |
| value | <code>\*</code> | 值 |
| expire | <code>String</code> | 过期时间,单位天 |

<a name="cookieGet"></a>

## cookieGet
cookie 获取

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="cookieRemove"></a>

## cookieRemove
cookie 删除

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="sessionStorageSet"></a>

## sessionStorageSet
sessionStorage 存贮某一段时间失效

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |
| value | <code>\*</code> | 存贮值 |
| expire | <code>String</code> | 过期时间,毫秒数 |

<a name="sessionStorageRemove"></a>

## sessionStorageRemove
sessionStorage 删除

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="sessionStorageGet"></a>

## sessionStorageGet
sessionStorage 获取

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="localStorageSet"></a>

## localStorageSet
localStorage 存贮某一段时间失效

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |
| value | <code>\*</code> | 存贮值 |
| expire | <code>number</code> | 过期时间,毫秒数 |

<a name="localStorageGet"></a>

## localStorageGet
localStorage 获取

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="localStorageRemove"></a>

## localStorageRemove
localStorage 移除

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | 属性 |

<a name="currentURL"></a>

## currentURL() ⇒ <code>string</code>
返回当前url

**Kind**: global function  
<a name="getUrlParam"></a>

## getUrlParam() ⇒ <code>null</code>
获取url参数（第一种）

**Kind**: global function  

| Type | Description |
| --- | --- |
| <code>string</code> | name |
| <code>string</code> | origin |

<a name="getUrlParams"></a>

## getUrlParams(name, origin)
获取url参数（第二种）

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>\*</code> | 
| origin | <code>\*</code> | 

<a name="replaceParamVal"></a>

## replaceParamVal(paramName, replaceWith)
修改url中的参数

**Kind**: global function  

| Param | Type |
| --- | --- |
| paramName | <code>string</code> | 
| replaceWith | <code>string</code> | 

<a name="funcUrlDel"></a>

## funcUrlDel(name)
删除url中指定的参数

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>string</code> | 

<a name="getClientHeight"></a>

## getClientHeight()
获取窗口可视范围的高度

**Kind**: global function  
<a name="getPageViewWidth"></a>

## getPageViewWidth()
**Kind**: global function  
<a name="getPageWidth"></a>

## getPageWidth()
获取窗口宽度

**Kind**: global function  
<a name="getViewportOffset"></a>

## getViewportOffset()
获取窗口尺寸

**Kind**: global function  
<a name="getPageScrollTop"></a>

## getPageScrollTop()
获取滚动条距顶部高度

**Kind**: global function  
<a name="getPageScrollLeft"></a>

## getPageScrollLeft()
获取滚动条距左边的高度

**Kind**: global function  

| Type |
| --- |
| <code>\*</code> | 

<a name="launchFullscreen"></a>

## launchFullscreen(element)
开启全屏

**Kind**: global function  

| Param | Type |
| --- | --- |
| element | <code>\*</code> | 

<a name="openWindow"></a>

## openWindow(url, windowName, width, height)
打开一个窗口

**Kind**: global function  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| windowName | <code>string</code> | 
| width | <code>number</code> | 
| height | <code>number</code> | 

<a name="exitFullscreen"></a>

## exitFullscreen()
关闭全屏

**Kind**: global function  
<a name="getQueryString"></a>

## getQueryString(name)
获取 url 后面通过?传参的参数

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="AutoResponse"></a>

## AutoResponse(width)
自适应页面（rem）

**Kind**: global function  

| Param | Type |
| --- | --- |
| width | <code>number</code> | 

<a name="getTreeData"></a>

## getTreeData(data, pid, [pidName], [idName], [childrenName], key) ⇒ <code>array</code>
递归生成树形结构

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>\*</code> |  |  |
| pid | <code>\*</code> |  |  |
| [pidName] | <code>string</code> | <code>&quot;&#x27;parentId&#x27;&quot;</code> |  |
| [idName] | <code>string</code> | <code>&quot;&#x27;id&#x27;&quot;</code> |  |
| [childrenName] | <code>string</code> | <code>&quot;&#x27;children&#x27;&quot;</code> |  |
| key | <code>string</code> |  | key |

<a name="inArray"></a>

## inArray(item, data)
查询数组中是否存在某个元素并返回元素第一次出现的下标

**Kind**: global function  

| Param | Type |
| --- | --- |
| item | <code>\*</code> | 
| data | <code>array</code> | 

<a name="countOccurrences"></a>

## countOccurrences(arr, value)
数组中某元素出现的次数

**Kind**: global function  

| Param | Type |
| --- | --- |
| arr | <code>array</code> | 
| value | <code>\*</code> | 

<a name="checkBrowser
判断是浏览器内核"></a>

## checkBrowser
判断是浏览器内核()
**Kind**: global function  
<a name="OutOsName"></a>

## OutOsName(osVersion)
Windows根据详细版本号判断当前系统名称

**Kind**: global function  

| Param | Type |
| --- | --- |
| osVersion | <code>string</code> | 

<a name="detectDeviceType"></a>

## detectDeviceType()
检测移动/PC设备

**Kind**: global function  
<a name="深拷贝"></a>

## 深拷贝(&lt;object&gt;) ⇒ <code>cloneObj</code>
**Kind**: global function  
**Returns**: <code>cloneObj</code> - <object>  

| Param | Type |
| --- | --- |
| <object> | <code>currentObject</code> | 

<a name="isObject"></a>

## isObject(obj) ⇒
**Kind**: global function  
**Returns**: boolean  

| Param | Type |
| --- | --- |
| obj | <code>\*</code> | 

<a name="getQueryString"></a>

## getQueryString(name)
获取 url 后面通过?传参的参数

**Kind**: global function  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 

<a name="randomNumInteger"></a>

## randomNumInteger(min, max) ⇒ <code>number</code>
生成随机整数

**Kind**: global function  

| Param | Type |
| --- | --- |
| min | <code>\*</code> | 
| max | <code>\*</code> | 

<a name="isYesterday"></a>

## isYesterday(val) ⇒ <code>boolean</code>
**Kind**: global function  
**Returns**: <code>boolean</code> - 返回布尔值  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | 需要验证的日期 |

<a name="timeToTimestamp"></a>

## timeToTimestamp(time) ⇒ <code>Number</code>
**Kind**: global function  
**Returns**: <code>Number</code> - - 返回值为时间毫秒值  

| Param | Type | Description |
| --- | --- | --- |
| time | <code>String</code> | time - 日期字符串，如'2018-8-8','2018,8,8','2018/8/8' |

<a name="dom选择器"></a>

## dom选择器(tagName) ⇒ <code>Object</code>
**Kind**: global function  
**Returns**: <code>Object</code> - tag  

| Param | Type |
| --- | --- |
| tagName | <code>string</code> | 

<a name="formatFileSize"></a>

## formatFileSize(fileSize)
B转换到KB,MB,GB并保留两位小数

**Kind**: global function  

| Param | Type |
| --- | --- |
| fileSize | <code>number</code> | 

<a name="fileToBase64String"></a>

## fileToBase64String(file, format, size, formatMsg, sizeMsg) ⇒ <code>Promise.&lt;any&gt;</code>
获取文件base64编码

**Kind**: global function  

| Param | Description |
| --- | --- |
| file |  |
| format | 指定文件格式 |
| size | 指定文件大小(字节) |
| formatMsg | 格式错误提示 |
| sizeMsg | 大小超出限制提示 |

