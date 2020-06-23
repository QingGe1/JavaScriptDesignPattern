class CVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.$methods = options.methods;
    observe(this.$data);
    this.proxy(this);
    new Compiler(options.el, this);
  }
  proxy(vm) {
    Object.keys(vm.$data).forEach((key) => {
      Object.defineProperty(vm, key, {
        get() {
          return vm.$data[key];
        },
        set(newVal) {
          vm.$data[key] = newVal;
        },
      });
    });
    Object.keys(vm.$methods).forEach((key) => {
      Object.defineProperty(vm, key, {
        get() {
          return vm.$methods[key];
        },
      });
    });
  }
}

function observe(value) {
  if (typeof value !== 'object' || value == null) {
    return value;
  }
  if (Object.prototype.toString.call(value) === '[object Array]') {
    // TODO
    return value;
  }
  return new Observer(value);
}

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }
  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
function defineReactive(obj, key, value) {
  observe(value);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      // console.log('get', key);
      // 只有创建 Watcher 时 Dep.target才有值
      Dep.target && dep.addDep(Dep.target);
      return value;
    },
    set(newVal) {
      if (newVal !== value) {
        // console.log('set', key, newVal);
        value = newVal;
        // 若 newVal 为引用值 需要重新 defineProperty
        observe(newVal);
        // 更新
        dep.notify();
      }
    },
  });
}

class Compiler {
  constructor(el, vm) {
    this.el = document.querySelector(el);
    this.vm = vm;
    this.compile(this.el);
  }
  compile(el) {
    // 1	Element	                代表元素	                                              Element, Text, Comment, ProcessingInstruction, CDATASection, EntityReference
    // 2	Attr	                  代表属性	                                              Text, EntityReference
    // 3	Text	                  代表元素或属性中的文本内容。	                          None
    // 4	CDATASection	          代表文档中的 CDATA 部分（不会由解析器解析的文本）。	    None
    // 5	EntityReference	        代表实体引用。																					Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
    // 6	Entity	                代表实体。																							Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
    // 7	ProcessingInstruction	  代表处理指令。																					None
    // 8	Comment	                代表注释。																							None
    // 9	Document	              代表整个文档（DOM 树的根节点）                          Element, ProcessingInstruction, Comment, DocumentType
    // 10	DocumentType	          向为文档定义的实体提供接口                              None
    // 11	DocumentFragment	      代表轻量级的 Document 对象，能够容纳文档的某个部分	    Element, ProcessingInstruction, Comment, Text, CDATASection, EntityReference
    // 12	Notation	              代表 DTD 中声明的符号。	                                None

    el.childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 模板插值
        this.compileText(node);
      }
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const attrName = attr.name;
      const attrValue = attr.value;
      // 指令
      if (attrName.indexOf('c-') === 0) {
        // 截取指令名称 执行对应指令
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, attrValue);
      }
      if (attrName.indexOf(':') === 0) {
        this.bind(node, attrValue, attrName.substring(1));
      }
      // 事件
      if (attrName.indexOf('@') === 0) {
        const eventName = attrName.substring(1);
        this.eventBinder(node, attrValue, eventName);
      }
    });
  }

  compileText(node) {
    this.update(node, RegExp.$1, 'text');
  }
  // bind
  bind(node, exp, attrName) {
    // TODO 根据不同元素设置不同的绑定方法
    node.setAttribute(attrName, this.vm[exp]);
    node[attrName] = this.vm[exp];
    new Watcher(this.vm, exp, (val) => {
      console.log('Watcher', exp, attrName, this.vm[exp]);
      node.setAttribute(attrName, this.vm[exp]);
      node[attrName] = this.vm[exp];
    });
  }
  // model
  model(node, exp) {
    if (node.nodeName === 'INPUT' && ['text', 'password'].includes(node.type)) {
      const inputFun = function (e) {
        // 这里的this是实例中的this
        this[exp] = e.target.value;
      };
      this.bind(node, exp, 'value');
      // TODO 解绑事件 怎么拿到 inputFun
      this.input(node, inputFun);
    }
  }
  // 事件
  eventBinder(node, exp, eventName) {
    if (this.vm[exp]) {
      this[eventName](node, this.vm[exp]);
    }
  }
  click(node, fn) {
    node.addEventListener('click', fn.bind(this.vm));
  }
  input(node, fn) {
    node.addEventListener('input', fn.bind(this.vm));
  }
  // 元素
  text(node, exp) {
    this.update(node, exp, 'text');
  }
  html(node, exp) {
    this.update(node, exp, 'html');
  }
  update(node, exp, dir) {
    const fn = this[dir + 'Updater'];
    fn && fn(node, this.vm[exp]);
    new Watcher(this.vm, exp, (val) => {
      fn && fn(node, val);
    });
  }
  textUpdater(node, value) {
    node.textContent = value;
  }
  htmlUpdater(node, value) {
    node.innerHTML = value;
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    Dep.target = this;
    vm[key];
    Dep.target = null;
  }
  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(watcher) {
    this.deps.push(watcher);
  }

  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}
