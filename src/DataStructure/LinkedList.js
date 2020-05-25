// 链表中的第一个节点是首节点（head），最后一个节点是尾节点（tail）。
// 无头链表是指第一个节点既有数据域，又有指针域，第一个节点既是首节点又是头节点。
// 有头链表是指第一个节点只有指针域，而没有数据域。
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
function reverse_recursion(head) {
  if (!head || !head.next) {
    return head;
  }
  let new_head = reverse_recursion(head.next);
  head.next.next = head; // 把当前节点连接到新链表上
  head.next = null;
  return new_head;
}
// console.log(reverse_recursion(linkList.head));

// 从尾到头打印链表
function reverse_print(head) {
  if (head.next) {
    reverse_print(head.next);
  }
  console.log(head.data);
}
// reverse_print(linkList.head);

// 合并两个两个有序链表
const linkList1 = new LinkList();
const linkList2 = new LinkList();
[1, 4, 9].forEach((item) => {
  linkList1.append(item);
});
console.log(linkList1.print());
[2, 5, 6, 10].forEach((item) => {
  linkList2.append(item);
});
console.log(linkList2.print());

function merge_link(head1, head2) {
  if (head1 == null) {
    return head2;
  }
  if (head2 == null) {
    return head1;
  }
  let merge = new LinkList();
  let merge_head = null; // 合并后链表头
  let merge_tail = null; // 合并后链表尾
  let curr_1 = head1;
  let curr_2 = head2;
  while (curr_1 && curr_2) {
    if (curr_1.data < curr_2.data) {
      min_data = curr_1.data;
      curr_1 = curr_1.next;
    } else {
      min_data = curr_2.data;
      curr_2 = curr_2.next;
    }
  }
}

merge_link(linkList1.head, linkList2.head);
