test('deep copy', () => {
  const { deepClone } = require('../index');
  const obj = { a: 1, b: { x: 3 }, c: [1, 2, 3] };
  const copyObj = deepClone(obj);
  expect(copyObj !== obj).toBe(true);
  expect(JSON.stringify(copyObj)).toBe(JSON.stringify(obj));
});
