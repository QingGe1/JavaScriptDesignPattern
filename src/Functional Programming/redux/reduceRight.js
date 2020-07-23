// 第 1 次 reduceRight 的返回值，下一次将作为 a
// () => fn3(() => {});

// 第 2 次 reduceRight 的返回值，下一次将作为 a
// () => fn2(() => fn3(() => {}));

// 第 3 次 reduceRight 的返回值，下一次将作为 a
// () => fn1(() => fn2(() => fn3(() => {})));
module.exports.compose = (...middlewares) => () =>
  middlewares.reduceRight(
    (a, b) => () => b(a),
    () => {}
  )();
