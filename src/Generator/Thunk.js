function thunkify(fn) {
  // 第一次传入参数
  return function () {
    let args = new Array(arguments.length);
    let ctx = this;

    for (let i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }
    // 第二次传入参数(callback)
    return function (done) {
      let called;

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}

/* 
function f(a, b, callback) {
  let sum = a + b;
  callback(sum);
}
const ft = thunkify(f);
const print = console.log.bind(console);
ft(1, 2)(print);
*/

// ES5版本
let ThunkEs5 = function (fn) {
  return function () {
    let args = Array.prototype.slice.call(arguments);
    return function (callback) {
      args.push(callback);
      return fn.apply(this, args);
    };
  };
};

// ES6版本
const ThunkEs6 = function (fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    };
  };
};

module.exports = { thunkify, ThunkEs5, ThunkEs6 };
