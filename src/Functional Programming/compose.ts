const compose = (...funcs:Array<Function>):Function => {
  if (funcs.length === 0) return (arg:any) => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a,b)=>(...args:Array<any>)=>a(b(...args)));
};

let fn1 = function (x:number):number {
  return x + 10;
};
let fn2 = function (x:number):number {
  return x * 10;
};
let fn3 = function (x:number):number {
  return x / 10;
};
console.log(fn3(fn1(fn2(fn1(6)))));
console.log(compose(fn3,fn1,fn2,fn1)(6));
