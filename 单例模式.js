/**
 * @Description:
 * @Author: qingge
 * @Date 2019-06-08 00:02
 */
/*
* 单例模式的定义：
* 保证一个类仅有一个实例，并提供一个访问它的全局访问点。
* 实现的方法为先判断实例存在与否，如果存在则直接返回，如果不存在就创建了再返回，
* 这就确保了一个类只有一个实例对象。
* 适用场景：一个单一对象。比如：弹窗，无论点击多少次，弹窗只应该被创建一次。
* */
class CreateUser {
  constructor(name) {
    this.name = name;
    this.getName();
  }
  getName() {
    return this.name;
  }
}

const ProxyMode = (function () {
  let instance = null;
  return function (name) {
    if (!instance) {
      instance = new CreateUser('a');
    }
    return instance
  }
})()

const a = ProxyMode('aaa')
const b = ProxyMode('bbb')
console.log(a === b);
