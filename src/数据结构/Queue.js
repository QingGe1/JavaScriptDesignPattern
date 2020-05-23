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
  // 为了让第二层循环正常循环 必须从1开始（若从0开始，第一行没法打印）
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
    console.log(line);
    // console.log(queue);
  }
}
// print_yanghui(10);

// 1
// 1  1
// 1  2  1
// 1  3  3  1
// 1  4  6  4  1
// 1  5  10  10  5  1
// 1  6  15  20  15  6  1
// 1  7  21  35  35  21  7  1
// 1  8  28  56  70  56  28  8  1
// 1  9  36  84  126  126  84  36  9  1

// 迷宫问题
// 元素为0，表示这个点可以通行，
// 元素为1，表示不可以通行，
// 起始点是maze_array[2][1], 终点是 maze_array[3][5]
// 请用程序计算这两个点是否相通，如果相通请输出两点之间的最短路径（从起始点到终点所经过的每一个点）
let maze_array = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
];

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.step = 0;
  }
}
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function findPosition(pos, maze) {
  let x = pos.x;
  let y = pos.y;
  let pos_arr = [];
  // 上
  if (x - 1 >= 0) {
    pos_arr.push(new Position(x - 1, y));
  }
  // 下
  if (x + 1 < maze.length) {
    pos_arr.push(new Position(x + 1, y));
  }
  // 左
  if (y - 1 >= 0) {
    pos_arr.push(new Position(x, y - 1));
  }
  // 右
  if (y + 1 < maze[x].length) {
    pos_arr.push(new Position(x, y + 1));
  }
  return pos_arr;
}

let start_pos = new Position(2, 1);
let end_pos = new Position(3, 5);

function print_node(maze_node) {
  for (let i = 0; i < maze_node.length; i++) {
    let arr = [];
    for (let j = 0; j < maze_node[i].length; j++) {
      arr.push(maze_node[i][j].step);
    }
    console.log(arr);
  }
  console.log('--------------------------------');
}
function findPath(maze, start_pos, end_pos) {
  let maze_node = [];
  // 初始化maze_node,用于记录距离出发点的距离
  for (let i = 0; i < maze_array.length; i++) {
    let arr = maze_array[i];
    let node_arr = [];
    for (let j = 0; j < arr.length; j++) {
      let node = new Node(i, j);
      node_arr.push(node);
    }
    maze_node.push(node_arr);
  }
  // 先把出发点放入到队列中
  let queue = new Queue();
  queue.enqueue(start_pos);
  let b_arrive = false;
  let max_step = 0; // 记录从出发点到终点的距离
  while (true) {
    // 从队列中弹出一个点,计算这个点可以到达的位置
    let position = queue.dequeue();
    let pos_arr = findPosition(position, maze);
    for (let i = 0; i < pos_arr.length; i += 1) {
      const pos = pos_arr[i];
      // 判断是否到达终点
      if (pos.x === end_pos.x && pos.y === end_pos.y) {
        b_arrive = true;
        max_step = maze_node[position.x][position.y].step;
        break;
      }
      // 若返回起点 跳出本次循环
      if (pos.x === start_pos.x && pos.y === start_pos.y) {
        continue;
      }
      // 若不能通过 跳出本次循环
      if (maze[pos.x][pos.y] === 1) {
        continue;
      }
      // 若已经标注过 跳出本次循环
      if (maze_node[pos.x][pos.y].step > 0) {
        continue;
      }
      maze_node[pos.x][pos.y].step = maze_node[position.x][position.y].step + 1;
      queue.enqueue(pos);
    }
    // 到达终点
    if (b_arrive) {
      break;
    }
    // 栈为空,说明找不到
    if (queue.isEmpty()) {
      break;
    }
  }
  // print_node(maze_node);
  // [ 2, 3, 0, 0, 0, 0, 0 ]
  // [ 1, 2, 0, 0, 0, 0, 0 ]
  // [ 0, 1, 2, 3, 0, 0, 0 ]
  // [ 1, 2, 3, 0, 0, 0, 0 ]
  // [ 0, 3, 4, 5, 0, 9, 0 ]
  // [ 0, 0, 0, 6, 7, 8, 9 ]
  // [ 0, 0, 0, 7, 8, 9, 10 ]
  // 反向查找路径
  let path = [];
  // 有结果
  if (b_arrive) {
    path.push(end_pos);
    let prevPos = end_pos;
    let step = max_step;
    // 在相邻点里边找 step 相同的点
    while (step > 0) {
      let pos_arr = findPosition(prevPos, maze);
      for (let i = 0; i < pos_arr.length; i += 1) {
        let pos = pos_arr[i];
        if (maze_node[pos.x][pos.y].step === step) {
          step -= 1;
          prevPos = pos;
          path.push(pos);
          break;
        }
      }
    }
    path.push(start_pos);
  }
  return path.reverse();
}

findPath(maze_array, start_pos, end_pos);
