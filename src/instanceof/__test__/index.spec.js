test('test instanceof', () => {
  const { copyInstanceof } = require('../index');
  // TODO
  // expect(copyInstanceof('This is a simple string', String)).toBe(false); // 返回 false, 检查原型链会找到 undefined
  expect(copyInstanceof(new String(), String)).toBe(true); // 返回 true
  expect(
    copyInstanceof(new String('String created with constructor'), String)
  ).toBe(true); // 返回 true
  expect(copyInstanceof(new String(), Object)).toBe(true); // 返回 true

  expect(copyInstanceof({}, Object)).toBe(true); // 返回 true, 尽管原型没有定义
  expect(copyInstanceof({}, Object)).toBe(true); // 返回 true, 同上
  expect(copyInstanceof(Object.create(null), Object)).toBe(false); // 返回 false, 一种创建非 Object 实例的对象的方法

  expect(copyInstanceof(new String(), Date)).toBe(false); // 返回 false

  expect(copyInstanceof(new Date(), Date)).toBe(true); // 返回 true
  expect(copyInstanceof(new Date(), Object)).toBe(true); // 返回 true
  expect(copyInstanceof(new Date(), String)).toBe(false); // 返回 false

  // 定义构造函数
  function C() {}
  function D() {}

  let o = new C();
  expect(copyInstanceof(o, C)).toBe(true); // true，因为 Object.getPrototypeOf(o) === C.prototype

  expect(copyInstanceof(o, D)).toBe(false); // false，因为 D.prototype 不在 o 的原型链上

  expect(copyInstanceof(o, Object)).toBe(true); // true，因为 Object.prototype.isPrototypeOf(o) 返回 true

  expect(copyInstanceof(C.prototype, Object)).toBe(true); // true，同上

  C.prototype = {};
  let o2 = new C();

  expect(copyInstanceof(o2, C)).toBe(true); // true

  expect(copyInstanceof(o, C)).toBe(false); // false，C.prototype 指向了一个空对象,这个空对象不在 o 的原型链上.

  D.prototype = new C(); // 继承
  let o3 = new D();

  expect(copyInstanceof(o3, D)).toBe(true); // true
  expect(copyInstanceof(o3, C)).toBe(true); // true 因为 C.prototype 现在在 o3 的原型链上
});
