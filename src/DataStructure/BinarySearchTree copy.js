let TreeNode = function (data) {
  this.data = data;
  this.leftChild = null;
  this.rightChild = null;
  this.parent = null;
};

function BinarySearchTree() {
  let root = null;
  const insert_data = function (node, data) {
    if (root == null) {
      root = new TreeNode(data);
      return true;
    }

    if (data < node.data) {
      if (node.leftChild) {
        // 往左子树里插入
        return insert_data(node.leftChild, data);
      } else {
        // 创建节点并插入
        const new_node = new TreeNode(data);
        node.leftChild = new_node;
        new_node.parent = node;
        return true;
      }
    } else if (data > node.data) {
      if (node.rightChild) {
        // 向右子树里插入
        return insert_data(node.rightChild, data);
      } else {
        // 创建节点并插入
        const new_node = new TreeNode(data);
        node.rightChild = new_node;
        new_node.parent = node;
        return true;
      }
    } else {
      // 如果相等,说明已经存在,不能再插入
      return false;
    }
  };

  this.insert = function (data) {
    return insert_data(root, data);
  };
  const search_data = function (node, data) {
    if (node == null) {
      return null;
    }

    if (data == node.data) {
      return node;
    } else if (data < node.data) {
      return search_data(node.leftChild, data);
    } else {
      return search_data(node.rightChild, data);
    }
  };

  this.search = function (data) {
    return search_data(root, data);
  };
  let link_parent = function (parent, node, next_node) {
    // 连接父节点和子节点
    if (parent == null) {
      root = next_node;
      root.parent = null;
    } else {
      if (parent.leftChild && parent.leftChild.data == node.data) {
        parent.leftChild = next_node;
      } else {
        parent.rightChild = next_node;
      }
    }
  };

  const remove_data = function (node, data) {
    if (node == null) {
      return false;
    }

    if (data < node.data) {
      // 去左子树里删除
      return remove_data(node.leftChild, data);
    } else if (data > node.data) {
      // 去又子树里删除
      return remove_data(node.rightChild, data);
    } else {
      if (node.leftChild && node.rightChild) {
        // 左右两个子树都存在,那么,找到中序下的第一个节点,这个节点在右子树里最小
        let tmp = node.rightChild;
        while (tmp.leftChild) {
          tmp = tmp.leftChild;
        }
        // 被删除点的值等于中序下第一个节点的值
        node.data = tmp.data;
        // 去右子树里删除中序下的第一个节点
        return remove_data(node.rightChild, tmp.data);
      } else {
        let parent = node.parent; // 找到父节点
        if (!node.leftChild) {
          // 没有左孩子
          link_parent(parent, node, node.rightChild);
        } else {
          link_parent(parent, node, node.leftChild);
        }
        return true;
      }
    }
  };

  this.remove = function (data) {
    return remove_data(root, data);
  };
  this.pre_order = function (node, callback) {
    if (node == null) {
      return;
    }
    console.log(node.data);
    this.pre_order(node.leftChild, callback);
    this.pre_order(node.rightChild, callback);
  };
  this.pre_order1 = function () {
    this.pre_order(root);
  };
}

const arr = [19, 27, 40, 35, 25, 10, 5, 17, 13, 7, 8];
const binarySearchTree = new BinarySearchTree();
arr.forEach((item) => {
  binarySearchTree.insert(item);
});
console.log('eg start----------------------------------------');
// binarySearchTree.pre_order(binarySearchTree.root, (node) => {
//   console.log(node.data);
// });
console.log(binarySearchTree.search(40));
console.log('eg end----------------------------------------');
