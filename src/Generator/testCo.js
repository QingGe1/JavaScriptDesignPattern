const fs = require('fs');
const co = require('./co');

/*
let readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

let gen = function* () {
  let f1 = yield readFile('./a.txt');
  let f2 = yield readFile('./b.txt');
  console.log(f1.toString());
  console.log(f2.toString());
};

function run(gen) {
  let g = gen();

  function next(data) {
    let result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

run(gen);
*/

// 处理并发的异步操作
function onerror(err) {
  console.error(err);
}
// 数组的写法
co(function* () {
  let res = yield [Promise.resolve(1), Promise.resolve(2)];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  let res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);

co(function* () {
  let values = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return x * 2;
}
