module.exports.compose = (...middlewares) => {
  if (middlewares.length === 0) {
    return (...arg) => arg;
  }

  // return function a(next = async () => {}) {
  //   return middlewares.reduce((a, b) => (arg) => a(() => b(arg)))(next);
  // };

  // 第 1 次 reduce 的返回值，下一次将作为 a
  // arg => fn1(() => fn2(arg));
  // 第 2 次 reduce 的返回值，下一次将作为 a
  // arg => (arg => fn1(() => fn2(arg)))(() => fn3(arg));
  // 等价于...
  // arg => fn1(() => fn2(() => fn3(arg)));
  // 执行最后返回的函数连接中间件，返回值等价于...
  // fn1(() => fn2(() => fn3(() => {})));

  // next 传递给最后一个 middleware 保证不会报错
  return (next = async () => {}) =>
    middlewares.reduce((a, b) => (arg) => a(() => b(arg)))(next);
};
