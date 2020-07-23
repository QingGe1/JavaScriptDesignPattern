module.exports.compose = (...middlewares) => () =>
  Promise.resolve(
    middlewares.reduceRight(
      (a, b) => () => Promise.resolve(b(a)),
      () => Promise.resolve()
    )()
  );
