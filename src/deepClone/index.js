// 没有考虑循环引用
function deepClone(obj) {
  let copy = obj instanceof Array ? [] : {};
  for (let i in obj) {
    copy[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
  }
  return copy;
}
module.exports = { deepClone };
