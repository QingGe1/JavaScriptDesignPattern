class TreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  in_order(node, callback) {
    if (node == null) {
      return;
    }
    this.in_order(node.leftChild, callback);
    callback(node);
    this.in_order(node.rightChild, callback);
  }
  pre_order(node, callback) {
    if (node == null) {
      return;
    }
    callback(node);
    this.pre_order(node.leftChild, callback);
    this.pre_order(node.rightChild, callback);
  }
  post_order(node, callback) {
    if (node == null) {
      return;
    }
    this.post_order(node.leftChild, callback);
    this.post_order(node.rightChild, callback);
    callback(node);
  }
  insert_data(node, data) {
    if (node.data > data) {
      if (node.leftChild) {
        return this.insert_data(node.leftChild, data);
      } else {
        const newNode = new TreeNode(data);
        node.leftChild = newNode;
        newNode.parent = node;
        return true;
      }
    }
    if (node.data < data) {
      if (node.rightChild) {
        return this.insert_data(node.rightChild, data);
      } else {
        const newNode = new TreeNode(data);
        node.rightChild = newNode;
        newNode.parent = node;
        return true;
      }
    }
    // 相等,已经存在,不能再插入
    return false;
  }
  insert(data) {
    if (this.root == null) {
      this.root = new TreeNode(data);
      return true;
    }
    return this.insert_data(this.root, data);
  }
  search_data(node, data) {
    if (node == null) {
      return null;
    }
    if (data === node.data) {
      return node;
    }
    if (data > node.data) {
      return this.search_data(node.rightChild, data);
    }
    return this.search_data(node.leftChild, data);
  }
  search(data) {
    return this.search_data(this.root, data);
  }
  // 连接父节点和子节点
  link_parent(parent, node, next_node) {
    if (parent == null) {
      this.root = next_node;
      this.root.parent = null;
    } else {
      // 判断 node 在 parent 的左还是右
      if (parent.leftChild && parent.leftChild.data === node.data) {
        parent.leftChild = next_node;
      } else {
        parent.rightChild = next_node;
      }
    }
  }
  remove_data(node, data) {
    if (node === null) {
      return false;
    }
    if (data < node.data) {
      return this.remove_data(node.leftChild, data);
    }
    if (data > node.data) {
      return this.remove_data(node.rightChild, data);
    }
    if (data === node.data) {
      if (node.leftChild && node.rightChild) {
        // 左右节点都存在
        // 找右子树中序遍历的第一个节点（这个节点在右子树中是最小的）
        // 这个节点比左子树中的值都大，比右子树中的值都小
        let tmp = node.rightChild;
        while (tmp.leftChild) {
          tmp = tmp.leftChild;
        }
        // 被删除点的值等于中序下右子树第一个节点的值
        node.data = tmp.data;
        // 去右子树里删除中序下的第一个节点
        return this.remove_data(node.rightChild, tmp.data);
      } else {
        let parent = node.parent;
        if (node.leftChild) {
          this.link_parent(parent, node, node.leftChild);
        } else {
          // 右节点 或 没有子节点
          // 没有子节点时，node.rightChild 为 null ，将 null 连接到 parent，
          this.link_parent(parent, node, node.rightChild);
        }
        return true;
      }
    }
  }
  remove(data) {
    return this.remove_data(this.root, data);
  }
}
const arr = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8];
const binarySearchTree = new BinarySearchTree();
arr.forEach((item) => {
  binarySearchTree.insert(item);
});
binarySearchTree.remove(27);
binarySearchTree.pre_order(binarySearchTree.root, (node) => {
  console.log(node.data);
});
