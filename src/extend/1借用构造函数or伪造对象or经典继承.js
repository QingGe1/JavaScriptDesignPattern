// 相对于原型链，借用构造函数可以在子类型构造函数中向超类型构造函数传递参数。

// 传入超类的参数只能固定在子类中
// 在超类型的原型中定义的方法，对子类型而言也是不可见的

function SuperType() {
  this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.flag = 1;
function SubType() {
  // 继承了 SuperType
  SuperType.call(this);
}
let instance1 = new SubType();
instance1.colors.push('black');
console.log(instance1);
console.log(instance1.colors); //"red,blue,green,black"
let instance2 = new SubType();
console.log(instance2.colors); //"red,blue,green"
