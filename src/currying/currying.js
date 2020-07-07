function currying(fn) {
  const args = [];
  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      // callee可以保证外部名称的变化，不会引起内部代码的修改，代码耦合度降低
      return arguments.callee;
    }
  };
}

// test
let Cost = (function () {
  let money = 0;

  return function () {
    for (let i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    return money;
  };
})();

let cost = currying(Cost); // 转化成currying函数
console.log(cost);
cost(100); // 未真正求值
cost(200); // 未真正求值
cost(300); // 未真正求值

console.log(cost()); // 求值并输出：600
