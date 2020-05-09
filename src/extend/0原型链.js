// 修改超类中的值会影响到每一个子类
// 在创建子类型的实例时，不能向超类型的构造函数中传递参数。
function SuperType() {
  this.colors = ['red', 'blue', 'green'];
}
function SubType() {}
// 继承了 SuperType
SubType.prototype = new SuperType();
let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1);
console.log(instance1.colors); //"red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); //"red,blue,green,black"
