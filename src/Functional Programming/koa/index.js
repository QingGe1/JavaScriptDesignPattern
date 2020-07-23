module.exports.compose = (...funcs) => {
  return function () {
    function dispatch(i) {
      const fn = funcs[i];
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(
        fn(function next() {
          return dispatch(i + 1);
        })
      );
    }
    return dispatch(0);
  };
};
