// 职责链模式
// 解耦了请求发送者和N个接收者之间的复杂关系，由于不知道链中的哪个节点可以处理你发出的请求，所以你只需把请求传递给第一个节点即可，
// 可以手动指定起始节点，请求并不是非得从链中的第一个节点开始传递。

// 在链尾增加一个保底的接受者节点来处理这种即将离开链尾的请求
// 避免过长的职责链带来的性能损耗
let order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100优惠券');
  } else {
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到50优惠券');
  } else {
    return 'nextSuccessor'; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

let orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    console.log('手机库存不足');
  }
};

// Chain.prototype.setNextSuccessor  指定在链中的下一个节点
// Chain.prototype.passRequest  传递请求给某个节点

let Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};
Chain.prototype.passRequest = function () {
  let ret = this.fn.apply(this, arguments);
  if (ret === 'nextSuccessor') {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }
  return ret;
};

let chainOrder500 = new Chain(order500);
let chainOrder200 = new Chain(order200);
let chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 0); // 输出：500元定金预购，得到100优惠券
// chainOrder500.passRequest( 2, true, 500 );    // 输出：200元定金预购，得到50优惠券
// chainOrder500.passRequest( 3, true, 500 );    // 输出：普通购买，无优惠券
// chainOrder500.passRequest( 1, false, 0 );     // 输出：手机库存不足

// 异步请求时， 调用next方法处理
Chain.prototype.next = function () {
  return (
    this.successor &&
    this.successor.passRequest.apply(this.successor, arguments)
  );
};
let fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
});

let fn2 = new Chain(function () {
  console.log(2);
  let self = this;
  setTimeout(function () {
    self.next();
  }, 1000);
});

let fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn2.passRequest();
