module.exports.compose = (...middlewares) => {
  let idx = 0;
  async function next() {
    if (middlewares[idx]) return Promise.resolve(middlewares[idx++](next));
  }
  return next;
};
