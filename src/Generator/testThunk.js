const fs = require('fs');
const { thunkify } = require('./Thunk');
const readFileThunk = thunkify(fs.readFile);

let gen = function* () {
  let r1 = yield readFileThunk('./a.txt');
  // console.log(r1.toString());
  let r2 = yield readFileThunk('./b.txt');
  // console.log(r2.toString());
  let r3 = yield readFileThunk('./c.txt');
  // console.log(r3);
};

function run(fn) {
  let gen = fn();
  function next(err, data) {
    let result = gen.next(data);
    if (data) {
      console.log(data.toString());
    }
    if (result.done) return;
    result.value(next); // 这里的 next 是 fs.readFile 的回调函数
  }
  // 启动
  next();
}

run(gen);
