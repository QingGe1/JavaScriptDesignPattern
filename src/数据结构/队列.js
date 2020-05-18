// TODO 链表实现

class Queue {
  constructor() {
    this._queue = [];
  }
  enqueue(val) {
    this._queue.push(val);
  }
  dequeue() {
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
  tail() {
    return this._queue[this.size() - 1];
  }
}
// 约瑟夫环
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
// let arr_list = [];
// for (let i = 0; i < 50; i++) {
//   arr_list.push(i);
// }
// console.log(del_ring(arr_list));
// 斐波那契数列
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

// 用两个队列实现一个栈

class QueueStack {
  constructor() {
    this.queue1 = new Queue();
    this.queue2 = new Queue();
    this.dataQueue = null; // 放数据的队列
    this.emptyQueue = null; // 空队列,备份使用
  }
  initQueues() {
    // 都为空,默认返回queue1
    if (this.queue1.isEmpty() && this.queue2.isEmpty()) {
      // queue1 queue2 为空
      this.dataQueue = this.queue1;
      this.emptyQueue = this.queue2;
    } else if (this.queue1.isEmpty()) {
      // queue1 为空
      this.dataQueue = this.queue2;
      this.emptyQueue = this.queue1;
    } else {
      // queue2 为空 或 都不为空
      this.dataQueue = this.queue1;
      this.emptyQueue = this.queue2;
    }
  }
  push(val) {
    this.initQueues();
    this.dataQueue.enqueue(val);
  }
  pop() {
    this.initQueues();
    while (this.dataQueue.size() > 1) {
      this.emptyQueue.enqueue(this.dataQueue.dequeue());
    }
    return this.dataQueue.dequeue();
  }
  top() {
    this.initQueues();
    return this.dataQueue.tail();
  }
  isEmpty() {}
  size() {}
  clear() {}
}

// let qStack = new QueueStack();
// qStack.push(1);
// qStack.push(2);
// qStack.push(3);
// qStack.push(4);
// qStack.pop();
// qStack.pop();
// qStack.pop();
// qStack.pop();

// 使用队列打印出杨辉三角的前n行，n >= 1

function print_yanghui(n) {
  let queue = new Queue();
  queue.enqueue(1);
  // 第一层for循环控制打印几层
  for (let i = 1; i <= n; i++) {
    let line = '';
    let pre = 0;
    // 第二层for循环控制打印第 i 层
    for (let j = 0; j < i; j++) {
      let item = queue.dequeue();
      line += item + '  ';
      // 计算下一位的内容
      let value = item + pre;
      pre = item;
      queue.enqueue(value);
    }
    // 每一层最后一个数字是1,上面的for循环没有计算最后一个数
    queue.enqueue(1);
    // console.log(line);
    console.log(queue);
  }
}
print_yanghui(10);
