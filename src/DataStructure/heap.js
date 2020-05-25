class MinHeap {
  constructor(size) {
    this.heap = new Array(); // 数组
    this.curr_size = 0; // 当前堆的大小
    this.max_size = size; // 堆最大容量
  }
  init(arr) {
    this.max_size = arr.length;
    this.curr_size = this.max_size;
    this.heap = new Array(arr.length);
    // 填充heap, 目前还不是一个堆
    for (let i = 0; i < this.curr_size; i++) {
      this.heap[i] = arr[i];
    }

    let curr_pos = Math.floor((this.curr_size - 2) / 2); // 这是堆的最后一个分支节点
    while (curr_pos >= 0) {
      this.shif_down(curr_pos, this.curr_size - 1); // 局部自上向下下滑调整
      curr_pos -= 1; // 调整下一个分支节点
    }
  }
  /*
   * start: 被调整节点索引
   * m: 最后一个节点索引
   */
  shif_down(start, m) {
    // 从start这个位置开始,向下下滑调整
    let parent_index = start; // start就是当前这个局部的父节点
    let min_child_index = parent_index * 2 + 1; // 一定有左孩子,先让min_child_index等于左孩子的索引

    while (min_child_index <= m) {
      // min_child_index+1 是左孩子的索引, 左孩子大于右孩子
      if (
        min_child_index < m &&
        this.heap[min_child_index] > this.heap[min_child_index + 1]
      ) {
        min_child_index = min_child_index + 1; // min_child_index永远指向值小的那个孩子
      }

      // 父节点的值小于等于两个孩子的最小值
      if (this.heap[parent_index] <= this.heap[min_child_index]) {
        break; // 循环结束,不需要再调整了
      } else {
        // 父节点和子节点的值互换
        let tmp = this.heap[parent_index];
        this.heap[parent_index] = this.heap[min_child_index];
        this.heap[min_child_index] = tmp;
        parent_index = min_child_index;
        min_child_index = 2 * min_child_index + 1;
      }
    }
  }
  shif_up(start) {
    let child_index = start;
    let parent_index = Math.floor((child_index - 1) / 2);
    // 这里使用 child_index > 0 作为循环条件
    // 也可以使用 parent_index >=0 作为循环条件
    while (child_index > 0) {
      // 由于插入前已经是最小堆
      // 所以若有左子节点，左子节点一定小于父节点
      // 故这里不需要比较两个子节点中的较小值
      if (this.heap[child_index] >= this.heap[parent_index]) {
        break;
      } else {
        [this.heap[parent_index], this.heap[child_index]] = [
          this.heap[child_index],
          this.heap[parent_index],
        ];
        child_index = parent_index;
        parent_index = Math.floor((child_index - 1) / 2);
      }
    }
  }
  insert(data) {
    if (this.curr_size === this.max_size) return false;
    this.heap[this.curr_size] = data;
    this.shif_up(this.curr_size);
    this.curr_size += 1;
    return true;
  }
  remove_min() {
    if (this.curr_size <= 0) {
      return null;
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.curr_size -= 1;
    this.shif_down(0, this.curr_size - 1);
    return min;
  }
  print() {
    return this.heap;
  }

  size() {
    return this.curr_size;
  }
  get min() {
    if (this.curr_size > 0) {
      return this.heap[0];
    }
    return null;
  }
}
// let arr = [53, 17, 78, 9, 45, 65, 87, 23];
// let min_heap = new MinHeap(arr.length);
// // min_heap.init(arr);
// arr.forEach((item) => {
//   min_heap.insert(item);
// });
// min_heap.print();

class MaxHeap {
  constructor(size = 9999) {
    this.heap = new Array();
    this.curr_size = 0;
    this.max_size = size;
  }
  init(arr) {
    this.max_size = arr.length;
    this.curr_size = this.max_size;
    this.heap = new Array(arr.length);
    for (let i = 0; i < this.curr_size; i++) {
      this.heap[i] = arr[i];
    }
    let curr_pos = Math.floor((this.curr_size - 2) / 2);
    while (curr_pos >= 0) {
      this.shif_down(curr_pos, this.curr_size - 1);
      curr_pos -= 1;
    }
  }
  shif_down(start, m) {
    let parent_index = start;
    let max_child_index = parent_index * 2 + 1;
    while (max_child_index <= m) {
      if (
        max_child_index < m &&
        this.heap[max_child_index + 1] > this.heap[max_child_index]
      ) {
        max_child_index = max_child_index + 1;
      }
      if (this.heap[parent_index] >= this.heap[max_child_index]) {
        break;
      } else {
        [this.heap[parent_index], this.heap[max_child_index]] = [
          this.heap[max_child_index],
          this.heap[parent_index],
        ];
        parent_index = max_child_index;
        max_child_index = 2 * max_child_index + 1;
      }
    }
  }
  shif_up(start) {
    let child_index = start;
    let parent_index = Math.floor((child_index - 1) / 2);
    while (child_index > 0) {
      if (this.heap[child_index] <= this.heap[parent_index]) {
        break;
      } else {
        [this.heap[parent_index], this.heap[child_index]] = [
          this.heap[child_index],
          this.heap[parent_index],
        ];
        child_index = parent_index;
        parent_index = Math.floor((child_index - 1) / 2);
      }
    }
  }
  insert(data) {
    if (this.curr_size === this.max_size) return false;
    this.heap[this.curr_size] = data;
    this.shif_up(this.curr_size);
    this.curr_size += 1;
    return true;
  }
  remove_max() {
    if (this.curr_size <= 0) {
      return null;
    }
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.curr_size -= 1;
    this.shif_down(0, this.curr_size - 1);
    return max;
  }
  print() {
    return this.heap;
  }
  size() {
    return this.curr_size;
  }
  get max() {
    if (this.curr_size > 0) {
      return this.heap[0];
    }
    return null;
  }
}

let arr = [53, 17, 78, 9, 45, 65, 87, 23];
let max_heap = new MaxHeap(arr.length);
max_heap.init(arr);
// arr.forEach((item) => {
//   max_heap.insert(item);
// });
max_heap.remove_max();
max_heap.print();
