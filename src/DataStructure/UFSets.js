// 等价类划分
let friends = [
  [0, 7],
  [1, 6],
  [4, 8],
  [8, 2],
  [9, 0],
  [3, 5],
  [1, 2],
];

class UFSets {
  constructor() {
    this.parent = [];
  }
  /*
   *
   * union
   * 合并两个不相交的集合，将root2合并到root1中
   * root1和root2是两个集合的集合名(索引)
   *
   * root1和root2是不相交的，需要在应用的时候自行去判断。
   */
  union(root1, root2) {
    this.parent[root1] += this.parent[root2];
    this.parent[root2] = root1;
  }
  /*
   *
   * find
   * 搜索x所在的集合，并返回这个集合的名字
   */
  find(x) {
    while (this.parent[x] >= 0) {
      x = this.parent[x];
    }
    return x;
  }
  /*
   * 进行初始化的时候，数组里的每个元素都初始化为-1
   *
   * 每个元素都是一个单独的集合，与其他集合互不相交
   * 对于刚刚初始化结束的并查集，每个元素是一个单独的集合，它的索引就是这个集合的集合名
   * 每个元素的值，就是其父节点所在的索引(由于刚刚初始化，每个元素的值都是-1，-1这个索引在数组中是不存在的，这恰好表明每个元素都没有父节点)
   */

  init(size) {
    for (let i = 0; i < size; i++) {
      this.parent.push(-1);
    }
  }
}
