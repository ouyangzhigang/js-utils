!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).Dom={})}(this,function(t){"use strict";function o(t){return"object"==typeof t?null!==t:"function"==typeof t}function O(t){if(!o(t))throw TypeError(t+" is not an object!");return t}function p(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}function A(t){return isNaN(t=+t)?0:(0<t?e:n)(t)}function a(t){return r.call(t).slice(8,-1)}var u,n=Math.ceil,e=Math.floor,T=Math.min,$=(u=!0,function(t,n){var e,r,o=String(p(t)),i=A(n),c=o.length;return i<0||c<=i?u?"":void 0:(e=o.charCodeAt(i))<55296||56319<e||i+1===c||(r=o.charCodeAt(i+1))<56320||57343<r?u?o.charAt(i):e:u?o.slice(i,i+2):r-56320+(e-55296<<10)+65536}),r={}.toString;function i(t,n){return t(n={exports:{}},n.exports),n.exports}function f(t){return"Symbol(".concat(void 0===t?"":t,")_",(++v+d).toString(36))}function P(t,n){var e,r,o,i,c=t.exec;if("function"==typeof c){var u=c.call(t,n);if("object"!=typeof u)throw new TypeError("RegExp exec method returned something other than an Object or null");return u}if("RegExp"!==(void 0===(e=t)?"Undefined":null===e?"Null":"string"==typeof(o=function(t,n){try{return t[n]}catch(t){}}(r=Object(e),x))?o:b?a(r):"Object"==(i=a(r))&&"function"==typeof r.callee?"Arguments":i))throw new TypeError("RegExp#exec called on incompatible receiver");return m.call(t,n)}var c,l,h=i(function(t){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)}),g=(h.version,i(function(t){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)})),s=i(function(t){var n="__core-js_shared__",e=g[n]||(g[n]={});(t.exports=function(t,n){return e[t]||(e[t]=void 0!==n?n:{})})("versions",[]).push({version:h.version,mode:"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})}),v=0,d=Math.random(),y=i(function(t){var n=s("wks"),e=g.Symbol,r="function"==typeof e;(t.exports=function(t){return n[t]||(n[t]=r&&e[t]||(r?e:f)("Symbol."+t))}).store=n}),x=y("toStringTag"),b="Arguments"==a(function(){return arguments}()),m=RegExp.prototype.exec,S=RegExp.prototype.exec,w=String.prototype.replace,E=S,j="lastIndex",_=(c=/a/,l=/b*/g,S.call(c,"a"),S.call(l,"a"),0!==c[j]||0!==l[j]),M=void 0!==/()??/.exec("")[1];(_||M)&&(E=function(t){var n,e,r,o,i=this;return M&&(e=new RegExp("^"+i.source+"$(?!\\s)",function(){var t=O(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}.call(i))),_&&(n=i[j]),r=S.call(i,t),_&&r&&(i[j]=i.global?r.index+r[0].length:n),M&&r&&1<r.length&&w.call(r[0],e,function(){for(o=1;o<arguments.length-2;o++)void 0===arguments[o]&&(r[o]=void 0)}),r});function R(t){try{return!!t()}catch(t){return 1}}function k(t,n){return z.call(t,n)}function C(r,o,t){if(!function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!")}(r),void 0===o)return r;switch(t){case 1:return function(t){return r.call(o,t)};case 2:return function(t,n){return r.call(o,t,n)};case 3:return function(t,n,e){return r.call(o,t,n,e)}}return function(){return r.apply(o,arguments)}}var F=E,I=!R(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}),N=g.document,U=o(N)&&o(N.createElement),q=!I&&!R(function(){return 7!=Object.defineProperty(U?N.createElement("div"):{},"a",{get:function(){return 7}}).a}),B=Object.defineProperty,D={f:I?Object.defineProperty:function(t,n,e){if(O(t),n=function(t,n){if(!o(t))return t;var e,r;if(n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;if("function"==typeof(e=t.valueOf)&&!o(r=e.call(t)))return r;if(!n&&"function"==typeof(e=t.toString)&&!o(r=e.call(t)))return r;throw TypeError("Can't convert object to primitive value")}(n,!0),O(e),q)try{return B(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},G=I?function(t,n,e){return D.f(t,n,{enumerable:!((r=1)&r),configurable:!(2&r),writable:!(4&r),value:e});var r}:function(t,n,e){return t[n]=e,t},z={}.hasOwnProperty,H=s("native-function-to-string",Function.toString),L=i(function(t){var i=f("src"),n="toString",c=(""+H).split(n);h.inspectSource=function(t){return H.call(t)},(t.exports=function(t,n,e,r){var o="function"==typeof e;o&&(k(e,"name")||G(e,"name",n)),t[n]!==e&&(o&&(k(e,i)||G(e,i,t[n]?""+t[n]:c.join(String(n)))),t===g?t[n]=e:r?t[n]?t[n]=e:G(t,n,e):(delete t[n],G(t,n,e)))})(Function.prototype,n,function(){return"function"==typeof this&&this[i]||H.call(this)})}),W="prototype",J=function(t,n,e){var r,o,i,c,u=t&J.F,a=t&J.G,f=t&J.S,l=t&J.P,s=t&J.B,p=a?g:f?g[n]||(g[n]={}):(g[n]||{})[W],v=a?h:h[n]||(h[n]={}),d=v[W]||(v[W]={});for(r in a&&(e=n),e)i=((o=!u&&p&&void 0!==p[r])?p:e)[r],c=s&&o?C(i,g):l&&"function"==typeof i?C(Function.call,i):i,p&&L(p,r,i,t&J.U),v[r]!=i&&G(v,r,c),l&&d[r]!=i&&(d[r]=i)};g.core=h,J.F=1,J.G=2,J.S=4,J.P=8,J.B=16,J.W=32,J.U=64,J.R=128,J({target:"RegExp",proto:!0,forced:F!==/./.exec},{exec:F});var K=y("species"),Q=!R(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),V=function(){var t=/(?:)/,n=t.exec;t.exec=function(){return n.apply(this,arguments)};var e="ab".split(t);return 2===e.length&&"a"===e[0]&&"b"===e[1]}(),X=Math.max,Y=Math.min,Z=Math.floor,tt=/\$([$&`']|\d\d?|<[^>]*>)/g,nt=/\$([$&`']|\d\d?)/g;!function(e,t,n){var r=y(e),i=!R(function(){var t={};return t[r]=function(){return 7},7!=""[e](t)}),o=i?!R(function(){var t=!1,n=/a/;return n.exec=function(){return t=!0,null},"split"===e&&(n.constructor={},n.constructor[K]=function(){return n}),n[r](""),!t}):void 0;if(!i||!o||"replace"===e&&!Q||"split"===e&&!V){var c=/./[r],u=n(p,r,""[e],function(t,n,e,r,o){return n.exec===F?i&&!o?{done:!0,value:c.call(n,e,r)}:{done:!0,value:t.call(e,n,r)}:{done:!1}}),a=u[0],f=u[1];L(String.prototype,e,a),G(RegExp.prototype,r,2==t?function(t,n){return f.call(t,this,n)}:function(t){return f.call(t,this)})}}("replace",2,function(o,i,j,_){return[function(t,n){var e=o(this),r=null==t?void 0:t[i];return void 0!==r?r.call(t,e,n):j.call(String(e),t,n)},function(t,n){var e=_(j,t,this,n);if(e.done)return e.value;var r=O(t),o=String(this),i="function"==typeof n;i||(n=String(n));var c=r.global;if(c){var u=r.unicode;r.lastIndex=0}for(var a,f,l,s=[];;){var p=P(r,o);if(null===p)break;if(s.push(p),!c)break;""===String(p[0])&&(r.lastIndex=(a=o,l=r.lastIndex,(f=0<l?T(A(l),9007199254740991):0)+(u?$(a,f).length:1)))}for(var v,d="",h=0,g=0;g<s.length;g++){p=s[g];for(var y=String(p[0]),x=X(Y(A(p.index),o.length),0),b=[],m=1;m<p.length;m++)b.push(void 0===(v=p[m])?v:String(v));var S=p.groups;if(i){var w=[y].concat(b,x,o);void 0!==S&&w.push(S);var E=String(n.apply(void 0,w))}else E=M(y,o,x,b,S,n);h<=x&&(d+=o.slice(h,x)+E,h=x+y.length)}return d+o.slice(h)}];function M(i,c,u,a,f,t){var l=u+i.length,s=a.length,n=nt;return void 0!==f&&(f=Object(p(f)),n=tt),j.call(t,n,function(t,n){var e;switch(n.charAt(0)){case"$":return"$";case"&":return i;case"`":return c.slice(0,u);case"'":return c.slice(l);case"<":e=f[n.slice(1,-1)];break;default:var r=+n;if(0==r)return t;if(s<r){var o=Z(r/10);return 0===o?t:o<=s?void 0===a[o-1]?n.charAt(1):a[o-1]+n.charAt(1):t}e=a[r-1]}return void 0===e?"":e})}});t.$$=function(t){return document.querySelector(t)},t.elementContains=function(t,n){return t!==n&&t.contains(n)},t.escapeHTML=function(t){t.replace(/[&<>'"]/g,function(t){return{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[t]||t})},t.getStyle=function(t,n){return window.getComputedStyle(t)[n]},t.hideTag=function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return[].concat(n).forEach(function(t){return t.style.display="none"})},Object.defineProperty(t,"__esModule",{value:!0})});
