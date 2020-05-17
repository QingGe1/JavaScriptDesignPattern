// TODO 链表实现

class Queue {
  constructor() {
    this._queue = [];
  }
  enqueue(val) {
    this._queue.push(val);
  }
  dequeue(val) {
    return this._queue.shift();
  }
  head() {
    return this._queue[0];
  }
  clear() {
    this._queue.length[0];
  }
  isEmpty() {
    return this.size() === 0;
  }
  size() {
    return this._queue.length;
  }
}

function del_ring(arr_list) {
  let queue = new Queue();
  for (let i = 0; i < arr_list.length; i++) {
    queue.enqueue(arr_list[i]);
  }
  let index = 0;
  while (queue.size() !== 1) {
    const item = queue.dequeue();
    if (index % 3 === 0) {
      queue.enqueue(item);
    }
    index += 1;
  }
  return queue.head();
}
let arr_list = [];
for (let i = 0; i < 50; i++) {
  arr_list.push(i);
}
console.log(del_ring(arr_list));

function fibonacci(n) {
  queue = new Queue();
  let index = 0;
  //	先放⼊斐波那契序列的前两个数值
  queue.enqueue(1);
  queue.enqueue(1);
  while (index < n - 2) {
    //	出队列⼀个元素
    let del_item = queue.dequeue();
    //	取队列头部元素
    let head_item = queue.head();
    let next_item = del_item + head_item;
    //	将计算结果放⼊队列
    queue.enqueue(next_item);
    index += 1;
  }
  queue.dequeue();
  return queue.head();
}

// console.log(fibonacci(8));
