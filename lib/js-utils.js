!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self)["js-utils"]={})}(this,function(e){"use strict";var t=Object.freeze({__proto__:null,currentURL:function(){return window.location.href},getUrlParam:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=null;return null!=(o=null==t?window.location.search.substr(1).match(n):t.substr(1).match(n))?decodeURIComponent(o[2]):null},getUrlParams:function(e){for(var t=location.href.split("?")[1].split("&"),n={},o=0;o<t.length;o++){var c=t[o].split("="),r=c[0],l=c[1];n[r]=l}return n[e]},funcUrlDel:function(e){var t=location,n=t.origin+t.pathname+"?",o=t.search.substr(1);if(-1<o.indexOf(e)){for(var c={},r=o.split("&"),l=0;l<r.length;l++)r[l]=r[l].split("="),c[r[l][0]]=r[l][1];return delete c[e],n+JSON.stringify(c).replace(/["{}]/g,"").replace(/:/g,"").replace(/,/g,"&")}},getClientHeight:function(){return document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight},getPageViewWidth:function(){var e=document;return("BackCompat"==e.compatMode?e.body:e.documentElement).clientWidth},getPageWidth:function(){var e=document,t=e.body,n=e.documentElement,o="BackCompat"==e.compatMode?t:e.documentElement;return Math.max(n.scrollWidth,t.scrollWidth,o.clientWidth)},getViewportOffset:function(){return window.innerWidth?{w:window.innerWidth,h:window.innerHeight}:"BackCompat"===document.compatMode?{w:document.body.clientWidth,h:document.body.clientHeight}:{w:document.documentElement.clientWidth,h:document.documentElement.clientHeight}},getPageScrollTop:function(){var e=document;return e.documentElement.scrollTop||e.body.scrollTop},getPageScrollLeft:function(){var e=document;return e.documentElement.scrollLeft||e.body.scrollLeft},launchFullscreen:function(e){e.requestFullscreen?e.requestFullscreen():e.mozRequestFullScreen?e.mozRequestFullScreen():e.msRequestFullscreen?e.msRequestFullscreen():e.webkitRequestFullscreen&&e.webkitRequestFullScreen()}});function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e){return null!==e&&/object|function/i.test(n(e))}var o=Object.freeze({__proto__:null,deepClone:function(e,t){if(!c())return e;if(t)return JSON.parse(JSON.stringify(e));var n=Array.isArray(e)?[]:{};for(var o in e)n[o]=c(e[o])?arguments.callee(n[o]):n[o];return n},isObject:c});var r=Object.freeze({__proto__:null,$$:function(e){return document.querySelector(e)}});e.Bower=t,e.Common=o,e.Dom=r,Object.defineProperty(e,"__esModule",{value:!0})});