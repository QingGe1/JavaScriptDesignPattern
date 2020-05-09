// 通过屏蔽原型链上的属性实现独立修改属性
// 超类上的属性还是创建时的属性
let person = {
  name: 'Nicholas',
  friends: ['Shelby', 'Court', 'Van'],
};

// 浅复制
let anotherPerson = Object.create(person);
anotherPerson.name = 'Greg';
anotherPerson.friends.push('Rob');
console.log(anotherPerson);

let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = 'Linda';
console.log(anotherPerson.name, yetAnotherPerson.name); //Greg Linda
yetAnotherPerson.friends.push('Barbie');
console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"

console.log(anotherPerson, yetAnotherPerson);
console.log(anotherPerson.__proto__ === yetAnotherPerson.__proto__);

// Object.create Polyfill
if (typeof Object.create !== 'function') {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }

    if (typeof propertiesObject != 'undefined')
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
