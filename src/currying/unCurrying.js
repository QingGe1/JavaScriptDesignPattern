Function.prototype.uncurrying = function () {
  const self = this;
  return function () {
    const obj = Array.prototype.shift.call(arguments);
    return self.apply(obj, arguments);
  };
};

console.log(Object.keys(Array.prototype));
