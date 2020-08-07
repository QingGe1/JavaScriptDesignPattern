@classDecorator
class XXX {
  @staticDecorator
  static staticMethod() { }
  @staticDecorator
  static staticProperty = 'property'
  @methodsDecorator
  myMethod() { }
  @methodsDecorator
  get name() {
    return 'name'
  }
  set name(value) { }
}

function classDecorator(constructor: any) {
  console.log('classDecorator');
  console.log('constructor:', constructor);
  // 可返回并替换构造函数
  // return constructor
}
function methodsDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('methodsDecorator');
  console.log('target:', target);
  console.log('propertyKey:', propertyKey);
  console.log('descriptor:', descriptor);
  // 函数装饰器的返回值会默认作为属性的value描述符存在，
  // 如果返回值为undefined则会忽略，使用之前的descriptor引用作为函数的描述符。
  // 访问器（添加有get、set前缀的函数），在使用上与函数没有什么区别
}
function staticDecorator(target: any, propertyKey: string,) {
  console.log('staticDecorator');
  console.log('target:', target);
  console.log('propertyKey:', propertyKey);
  // 属性装饰器返回值会被忽略
  // 若需要修改静态属性 需要手动获取descriptor
  let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
  if (descriptor) {
    Object.defineProperty(target, propertyKey, {
      ...descriptor,
      value: `wrap_${descriptor.value}`
    })
  }
  return target
}