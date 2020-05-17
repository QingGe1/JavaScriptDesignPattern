// TODO 链表实现

class Stack {
  constructor() {
    this._stack = [];
  }
  push(val) {
    this._stack.push(val);
  }
  pop() {
    return this._stack.pop();
  }
  top() {
    return this._stack[this._stack.length - 1];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this._stack.length;
  }
  clear() {
    this._stack.length = 0;
  }
}

// sdf(ds(ew(we)rw)rwqq)qwewe			合法
// (sd(qwqw)sd(sd))													合法
// ()()sd()(sd()fw))(											不合法

function is_leagl_brackets(string) {
  const stact = new Stack();
  for (let i in string) {
    const s = string[i];
    if (s === '(') {
      stact.push(s);
      continue;
    }
    if (s === ')') {
      stact.pop();
      continue;
    }
  }
  return stact.isEmpty();
}
// console.log(is_leagl_brackets('()()sd()(sd()fw))(	'));

// ["4",	"13",	"5",	"/",	"+"]	等价于(4	+	(13	/	5))	=	6
// ["10",	"6",	"9",	"3",	"+",	"-11",	"*",	"/",	"*",	"17",	"+",	"5",	"+"]	等价于((10	*	(6	/	((9	+	3)	*	-11)))	+	17)	+	5

function calc_exp(exp) {
  const stact = new Stack();
  for (let i in exp) {
    const s = exp[i];
    if (['+', '-', '*', '/'].includes(s)) {
      const val1 = stact.pop();
      const val2 = stact.pop();
      const res = parseFloat(eval(`${val2}${s}${val1}`));
      stact.push(res);
    } else {
      stact.push(s.toString());
    }
  }
  return stact.pop();
}
console.log(calc_exp(['4', '13', '5', '/', '+']));
