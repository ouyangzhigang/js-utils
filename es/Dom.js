/**
 * @function $$
 * @name dom选择器
 * @param {*} tag
 */
function $$(tagName) {
  return document.querySelector(tagName);
}

export { $$ };
