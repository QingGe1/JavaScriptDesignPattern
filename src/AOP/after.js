Function.prototype.after = function (afterfn) {
  let __self = this;
  return function (...args) {
    let ret = __self.apply(this, args);
    afterfn.apply(this, args);
    return ret;
  };
};

const after = function (fn, afterfn) {
  return function (...args) {
    const ret = fn.apply(this, args);
    afterfn.apply(this, args);
    return ret;
  };
};
