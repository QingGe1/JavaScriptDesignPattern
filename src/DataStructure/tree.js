const { Stack } = require('./Stack');

class BinTreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null; // 左孩子
    this.rightChild = null; // 右孩子
    this.parentNode = null; // 父节点
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
  }
  init_tree(treeString) {
    let stack = new Stack();
    let k = '';
    let new_node = null;
    for (let i = 0; i < treeString.length; i++) {
      let item = treeString[i];
      if (item == '#') {
        break;
      } else if (item == '(') {
        stack.push(new_node);
        k = 'left';
      } else if (item == ')') {
        stack.pop();
      } else if (item == ',') {
        k = 'right';
      } else {
        new_node = new BinTreeNode(item);
        if (this.root == null) {
          this.root = new_node;
        } else if (k == 'left') {
          // 左子树
          const top_item = stack.top();
          top_item.leftChild = new_node;
          new_node.parentNode = top_item;
        } else {
          // 右子树
          const top_item = stack.top();
          top_item.rightChild = new_node;
          new_node.parentNode = top_item;
        }
      }
    }
    return this.root;
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
  size() {
    // 左子树的节点数量加上右子树的节点数量 再加上1
    const tree_node_count = function (nod) {
      if (!nod) {
        return 0;
      }
      let left_node_count = tree_node_count(nod.leftChild);
      let right_node_count = tree_node_count(nod.rightChild);
      return left_node_count + right_node_count + 1;
    };
    return tree_node_count(this.root);
  }
  height() {
    // 左子树的高度和右子树的高度取最大值,加上当前的高度
    const tree_height = function (node) {
      if (!node) {
        return 0;
      }
      const left_tree_height = tree_height(node.leftChild);
      const right_tree_height = tree_height(node.rightChild);
      return Math.max(left_tree_height, right_tree_height) + 1;
    };
    return tree_height(this.root);
  }
  find(data) {
    const find_node = function (node, data) {
      if (!node) return null;
      if ((node.data = data)) return node;
      const left_res = find_node(node.leftChild, data);
      if (left_res) return left_res;
      return find_node(node.rightChild, node);
    };
    return find_node(this.root, data);
  }
}

const binaryTree = new BinaryTree();
// binaryTree.init_tree('A(B(D,E(G,)),C(,F))#');
binaryTree.init_tree('A(B(D(G,)),C(,F))#');
// binaryTree.post_order(binaryTree.root, (node) => {
//   console.log(node.data);
// });
// console.log(binaryTree.size());
// console.log(binaryTree.height());
// console.log(binaryTree.find('A'));

/* 求一棵树的镜像 */
function mirror(node) {
  if (!node) return;
  [node.leftChild, node.rightChild] = [node.rightChild, node.leftChild];
  mirror(node.leftChild);
  mirror(node.rightChild);
}
// mirror(binaryTree.root);
// binaryTree.in_order(binaryTree.root, (node) => {
//   console.log(node.data);
// }); // F C A E G B D
/* 使用非递归方式实现前序遍历 */

function pre_order(node, callback) {
  const stack = new Stack();
  let curr = node;
  while (curr) {
    callback(curr);
    if (curr.rightChild) {
      stack.push(curr.rightChild);
    }
    if (curr.leftChild) {
      curr = curr.leftChild;
    } else {
      curr = stack.pop();
    }
  }
}

pre_order(binaryTree.root, (node) => {
  console.log(node.data);
});
