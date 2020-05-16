/*
 *
 * 当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
 *
 * 优点
 * 时间上的解耦
 * 对象之间的解耦
 *
 * 缺点
 * 创建订阅者本身要消耗一定的时间和内存
 * 订阅一个消息后，也许此消息最后都未发生，但这个订阅者会始终存在于内存中
 * 发布—订阅模式虽然可以弱化对象之间的联系，但如果过度使用的话，对象和对象之间的必要联系也将被深埋在背后，会导致程序难以跟踪维护和理解
 */
const event = (function () {
  // 订阅者
  const clientList = {};
  // 离线事件
  const events = {};
  // 订阅
  const listen = function (key, callback) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    if (!callback || typeof callback !== 'function') {
      return false;
    }
    clientList[key].push(callback);
    if (events[key]) {
      events[key].forEach((item) => {
        callback.apply(this, item);
      });
    }
  };
  // 发布
  const tirgger = function (key, ...args) {
    if (!events[key]) {
      events[key] = [];
    }
    events[key].push(args);
    const client = clientList[key];
    if (!client) {
      return false;
    }
    client.forEach((callback) => {
      callback.apply(this, args);
    });
  };
  // 删除
  const remove = function (key, callback) {
    if (!callback || typeof callback !== 'function') {
      return false;
    }
    const client = clientList[key];
    if (!client) {
      return false;
    }
    for (let i = 0; i < client.length; i++) {
      if (client[i] === callback) {
        client.splice(i, 1);
        break;
      }
    }
  };
  return {
    listen,
    tirgger,
    remove,
  };
})();
