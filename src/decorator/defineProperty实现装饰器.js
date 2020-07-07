class Test {
  getData() {
    return [
      {
        id: 1,
        name: 'Niko',
      },
      {
        id: 2,
        name: 'Bellic',
      },
    ];
  }
}
// 返回具体装饰器
function wrap(decorator) {
  return function (Model, key) {
    let target = Model.prototype;
    let descriptor = Object.getOwnPropertyDescriptor(target, key);
    decorator(target, key, descriptor);
  };
}
// 运行时间装饰器实现
let log = function (target, key, descriptor) {
  Object.defineProperty(target, key, {
    ...descriptor,
    value: function (...arg) {
      let start = new Date().valueOf();
      try {
        return descriptor.value.apply(this, arg);
      } finally {
        let end = new Date().valueOf();
        console.log(`start: ${start} end: ${end} consume: ${end - start}`);
      }
    },
  });
};
// writable false 装饰器实现
let seal = function (target, key, descriptor) {
  Object.defineProperty(target, key, {
    ...descriptor,
    writable: false,
  });
};

// 实际装饰器
log = wrap(log);
seal = wrap(seal);

// 添加耗时统计
log(Test, 'getData');
Test.prototype.getData();
// 设置属性不可被修改
seal(Test, 'getData');
Test.prototype.getData = 1; // 无效
console.log(Test.prototype.getData);
