const event = (function () {
  // 订阅者
  const clientList = {};
  // 离线事件
  const events = {};
  // 订阅
  const listen = function (key, callback) {
    if (!clientList[key]) {
      clientList[key] = []
    }
    if (!callback || typeof callback !== 'function') {
      return false
    }
    clientList[key].push(callback)
    if (events[key]) {
      events[key].forEach((item) => {
        callback.apply(this, item);
      })
    }
  }
  // 发布
  const tirgger = function (key, ...args) {
    if (!events[key]) {
      events[key] = [];
    }
    events[key].push(args)
    const client = clientList[key];
    if (!client){
      return false
    }
    client.forEach((callback) => {
      callback.apply(this, args)
    })
  }
  // 删除
  const remove = function (key, callback) {
    if (!callback || typeof callback !== 'function') {
      return false
    }
    const client = clientList[key];
    if (!client) {
      return false
    }
    for (let i = 0; i < client.length; i++) {
      if (client[i] === callback) {
        client.splice(i,1)
        break
      }
    }
  }
  return {
    listen,
    tirgger,
    remove
  }

})()