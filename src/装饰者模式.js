/**
 * @Description:
 * @Author: qingge
 * @Date 2019-06-08 00:48
 */

/*
 * 装饰者模式的定义：在不改变对象自身的基础上，在程序运行期间给对象动态地添加方法。
 * 例如：
 * 现有4种型号的自行车分别被定义成一个单独的类，
 * 如果给每辆自行车都加上前灯、尾灯、铃铛这3个配件，
 * 如果用类继承的方式，需要创建4*3=12个子类。
 * 但如果通过装饰者模式，只需要创建3个类。
 *
 * 装饰者模式适用的场景：
 * 原有方法维持不变，在原有方法上再挂载其他方法来满足现有需求；
 * 函数的解耦，将函数拆分成多个可复用的函数，再将拆分出来的函数挂载到某个函数上，实现相同的效果但增强了复用性。
 *
 * 例：用AOP装饰函数实现装饰者模式
 * */

Function.prototype.before = function (beforefn) {
  const self = this; //保存原函数引用
  return function () {
    //返回包含了原函数和新函数的 '代理函数'
    beforefn.apply(this, arguments); //执行新函数，修正this
    return self.apply(this, arguments); //执行原函数
  };
};
Function.prototype.after = function (afterfn) {
  const self = this;
  return function () {
    const ret = self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};
let func = function () {
  console.log('2');
};
//func1和func3为挂载函数
const func1 = function () {
  console.log('1');
};
const func3 = function () {
  console.log('3');
};
func = func.before(func1).after(func3);
func();

/*
 * 代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。
 * 代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。
 * 本体定义了关键功能，而代理提供或拒绝对它的访问，或者在访问本体之前做一些额外的事情。
 * 装饰者模式的作用就是为对象动态加入行为。
 * 换句话说，代理模式强调一种关系（Proxy与它的实体之间的关系），
 * 这种关系可以静态的表达，也就是说，这种关系在一开始就可以被确定。
 * 而装饰者模式用于一开始不能确定对象的全部功能时。
 * 代理模式通常只有一层代理-本体的引用，而装饰者模式经常会形成一条长长的装饰链。
 *
 * */

// Eg 2
let plane = {
  fire: function () {
    console.log('发射普通子弹');
  },
};

let missileDecorator = function () {
  console.log('发射导弹');
};

let atomDecorator = function () {
  console.log('发射原子弹');
};

let fire1 = plane.fire;

plane.fire = function () {
  fire1();
  missileDecorator();
};

let fire2 = plane.fire;

plane.fire = function () {
  fire2();
  atomDecorator();
};
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
