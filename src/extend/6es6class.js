class SuperType {
  constructor(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
  }
  sayName() {
    console.log(this.name);
  }
}
class SubType extends SuperType {
  constructor(name, age) {
    // super() 在这里相当于 SuperType.prototype.constructor.call(this)。
    super(name);
    this.age = age;
  }
  sayAge() {
    console.log(this.age);
  }
}

const instance = new SubType('name', 18);
console.log(instance);

// 匿名类
let Anonymous = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Anonymous.name); // output: "Anonymous"

// 具名类
let BeNamed = class BeNamed2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(BeNamed.name); // 输出: "Rectangle2"
