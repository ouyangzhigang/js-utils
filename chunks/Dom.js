/**
 * @function $$
 * @name dom选择器
 * @param { string } tagName
 * @return { Object } tag
 */
export function $$ (tagName) {
  return document.querySelector(tagName)
}

/**
 * 隐藏所有指定标签
 * 例: hide(document.querySelectorAll('img'))
 * @param { node } - el
 */
export const hideTag = (...el) => [...el].forEach(e => (e.style.display = 'none'));

/**
 * 返回指定元素的生效样式
 * @param { element} el  元素节点
 * @param { string } ruleName  指定元素的名称
 */
export const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

/**
 * 检查是否包含子元素
 * @param { element } parent
 * @param { element } child
 * 例：elementContains(document.querySelector('head'), document.querySelector('title')); // true
 */
export const elementContains = (parent, child) => parent !== child && parent.contains(child);

/**
 * 转义html(防XSS攻击)
 * @param { string } - str - 需转义的字符串
 */
export const escapeHTML = str =>{
  str.replace(
    /[&<>'"]/g,
    tag =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
  );
};
