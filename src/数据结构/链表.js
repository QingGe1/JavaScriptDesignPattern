function LinkList() {
  this.length = 0; // 长度
  this.head = null; // 头节点
  this.tail = null; // 尾节点
}
LinkList.prototype.Node = function (data) {
  return {
    data,
    next: null,
  };
};
LinkList.prototype.append = function append(data) {
  const node = new this.Node(data);
  if (this.head === null) {
    this.head = node;
    this.tail = this.head;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
  this.length += 1;
  return true;
};
LinkList.prototype.print = function print() {
  let currNode = this.head;
  let strLink = '';
  while (currNode) {
    strLink += `${currNode.data}->`;
    currNode = currNode.next;
  }
  strLink += 'null';
  return strLink;
};
LinkList.prototype.getNode = function (index) {
  // 不再链表长度内
  if (index > this.length || index < 0) {
    return null;
  }
  let currNode = this.head;
  let nodeIndex = 0;
  while (nodeIndex < index) {
    currNode = currNode.next;
    nodeIndex += 1;
  }
  this.length += 1;
  return currNode;
};
LinkList.prototype.insert = function (index, data) {
  // 在链表尾
  if (index === this.length) {
    this.append(data);
    return true;
  }
  // 不再链表长度内
  if (index > this.length || index < 0) {
    return false;
  }
  const node = new this.Node(data);
  if (index === 0) {
    node.next = this.head;
    this.head = node;
  } else {
    // 要插入的位置是index,找到索引为index-1的节点,然后进行连接
    const preNode = this.getNode(index - 1);
    node.next = preNode.next;
    preNode.next = node;
  }
  this.length += 1;
  return true;
};
LinkList.prototype.remove = function (index) {
  // 不再链表长度内
  if (index > this.length || index < 0) {
    return false;
  }
  let delNode = null;
  if (index === 0) {
    delNode = this.head;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
  } else {
    const preNode = this.getNode(index - 1);
    delNode = preNode.next;
    preNode.next = preNode.next.next;
    if (delNode.next == null) {
      this.tail = preNode;
    }
  }
  this.length -= 1;
  delNode.next = null;
  return delNode.data;
};
LinkList.prototype.get = function (index) {
  let node = this.getNode(index);
  if (node) {
    return node.data;
  }
  return null;
};
LinkList.prototype.indexOf = function (value) {
  let index = -1;
  let currNode = this.head;
  while (currNode) {
    index += 1;
    if (currNode.data === value) {
      return index;
    }
    currNode = currNode.next;
  }
  return -1;
};
LinkList.prototype.remove_head = function () {
  return this.remove(0);
};
LinkList.prototype.remove_tail = function () {
  return this.remove(this.length - 1);
};
LinkList.prototype.head = function () {
  return this.head.data;
};
LinkList.prototype.tail = function () {
  return this.tail.data;
};
LinkList.prototype.isEmpty = function () {
  return this.length === 0;
};
LinkList.prototype.clear = function () {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

// const linkList = new LinkList();
// linkList.append(0);
// linkList.append(1);
// linkList.append(2);
// linkList.append(3);
// linkList.append(4);
// console.log(linkList.getNode(4));
// linkList.remove(1);
// console.log(linkList.print());
// console.log(linkList.indexOf(3));

const linkList = new LinkList();
linkList.append(0);
linkList.append(1);
linkList.append(2);
linkList.append(3);
linkList.append(4);
// 迭代翻转
function reverse_iter(head) {
  if (!head) {
    return null;
  }
  let prevNode = null;
  let currNode = head;
  while (currNode) {
    let nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
  }
  return prevNode;
}

// console.log(reverse_iter(linkList.head));
// 递归翻转
function reverse_digui(head) {
  if (!head) {
    return null;
  }
  let new_head = reverse_digui(head.next);
}
console.log(reverse_digui(linkList.head));
