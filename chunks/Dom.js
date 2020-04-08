/**
 * @function $$
 * @name dom选择器
 * @param {*} tag
 */
export function $$ (tagName) {
  return document.querySelector(tagName)
}