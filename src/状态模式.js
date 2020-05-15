/*
 * 优点
 * 状态模式定义了状态与行为之间的关系，并将它们封装在一个类里。通过增加新的状态类，很容易增加新的状态和转换。
 * 避免Context无限膨胀，状态切换的逻辑被分布在状态类中，也去掉了Context中原本过多的条件分支。
 * 用对象代替字符串来记录当前状态，使得状态的切换更加一目了然。
 * Context中的请求动作和状态类中封装的行为可以非常容易地独立变化而互不影响。
 *
 * 缺点
 * 定义许多状态类
 * 系统中会因此而增加不少对象
 * 逻辑分散，无法在一个地方就看出整个状态机的逻辑
 *
 * 性能优化点
 * 仅当state对象被需要时才创建并随后销毁
 *    如果状态的改变很频繁，最好一开始就把这些state对象都创建出来，也没有必要销毁它们，因为可能很快将再次用到它们
 * 各Context对象可以共享一个state对象，这也是享元模式的应用场景之一
 */
let plugin = (function () {
  let plugin = document.createElement('embed');
  plugin.style.display = 'none';

  plugin.type = 'application/txftn-webkit';

  plugin.sign = function () {
    console.log('开始文件扫描');
  };
  plugin.pause = function () {
    console.log('暂停文件上传');
  };

  plugin.uploading = function () {
    console.log('开始文件上传');
  };

  plugin.del = function () {
    console.log('删除文件上传');
  };

  plugin.done = function () {
    console.log('文件上传完成');
  };

  document.body.appendChild(plugin);

  return plugin;
})();
// Context
// 在构造函数中为每种状态子类都创建一个实例对象
let Upload = function (fileName) {
  this.plugin = plugin;
  this.fileName = fileName;
  this.button1 = null;
  this.button2 = null;
  this.signState = new SignState(this); // 设置初始状态为waitin
  this.uploadingState = new UploadingState(this);
  this.pauseState = new PauseState(this);
  this.doneState = new DoneState(this);
  this.errorState = new ErrorState(this);
  this.currState = this.signState; // 设置当前状态
};
// 负责往页面中创建跟上传流程有关的DOM节点，并开始绑定按钮的事件
Upload.prototype.init = function () {
  let that = this;
  this.dom = document.createElement('div');
  this.dom.innerHTML =
    '<span>文件名称:' +
    this.fileName +
    '</span>\
      <button data-action="button1">扫描中</button>\
      <button data-action="button2">删除</button>';

  document.body.appendChild(this.dom);
  this.button1 = this.dom.querySelector('[data-action="button1"]'); // 第一个按钮
  this.button2 = this.dom.querySelector('[data-action="button2"]'); // 第二个按钮
  this.bindEvent();
};
// 负责具体的按钮事件实现，在点击了按钮之后，Context并不做任何具体的操作，而是把请求委托给当前的状态类来执行
Upload.prototype.bindEvent = function () {
  let self = this;
  this.button1.onclick = function () {
    self.currState.clickHandler1();
  };
  this.button2.onclick = function () {
    self.currState.clickHandler2();
  };
};
// 状态对应的逻辑行为放在Upload类中
Upload.prototype.sign = function () {
  this.plugin.sign();
  this.currState = this.signState;
};

Upload.prototype.uploading = function () {
  this.button1.innerHTML = '正在上传，点击暂停';
  this.plugin.uploading();
  this.currState = this.uploadingState;
};

Upload.prototype.pause = function () {
  this.button1.innerHTML = '已暂停，点击继续上传';
  this.plugin.pause();
  this.currState = this.pauseState;
};

Upload.prototype.done = function () {
  this.button1.innerHTML = '上传完成';
  this.plugin.done();
  this.currState = this.doneState;
};

Upload.prototype.error = function () {
  this.button1.innerHTML = '上传失败';
  this.currState = this.errorState;
};

Upload.prototype.del = function () {
  this.plugin.del();
  this.dom.parentNode.removeChild(this.dom);
};
// 编写各个状态类的实现
let StateFactory = (function () {
  let State = function () {};

  State.prototype.clickHandler1 = function () {
    throw new Error('子类必须重写父类的clickHandler1方法');
  };

  State.prototype.clickHandler2 = function () {
    throw new Error('子类必须重写父类的clickHandler2方法');
  };

  return function (param) {
    let F = function (uploadObj) {
      this.uploadObj = uploadObj;
    };

    F.prototype = new State();

    for (let i in param) {
      F.prototype[i] = param[i];
    }

    return F;
  };
})();

let SignState = StateFactory({
  clickHandler1: function () {
    console.log('扫描中，点击无效...');
  },
  clickHandler2: function () {
    console.log('文件正在上传中，不能删除');
  },
});

let UploadingState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.pause();
  },
  clickHandler2: function () {
    console.log('文件正在上传中，不能删除');
  },
});

let PauseState = StateFactory({
  clickHandler1: function () {
    this.uploadObj.uploading();
  },
  clickHandler2: function () {
    this.uploadObj.del();
  },
});

let DoneState = StateFactory({
  clickHandler1: function () {
    console.log('文件已完成上传, 点击无效');
  },
  clickHandler2: function () {
    this.uploadObj.del();
  },
});

let ErrorState = StateFactory({
  clickHandler1: function () {
    console.log('文件上传失败, 点击无效');
  },
  clickHandler2: function () {
    this.uploadObj.del();
  },
});

let uploadObj = new Upload('JavaScript设计模式与开发实践');
uploadObj.init();

window.external.upload = function (state) {
  uploadObj[state]();
};

window.external.upload('sign');

setTimeout(function () {
  window.external.upload('uploading'); // 1秒后开始上传
}, 1000);

setTimeout(function () {
  window.external.upload('done'); // 5秒后上传完成
}, 5000);
/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * OffLightState
 **/
/*
class State {
  buttonWasPressed() {
    throw new Error('父类的buttonWasPressed方法必须被重写');
  }
}

class SuperStrongLightState extends State {
  constructor() {
    super();
  }
}

console.log(new SuperStrongLightState());
class Light {
  constructor() {
    this.offLightState = new OffLightState(this);
    this.weakLightState = new WeakLightState(this);
    this.strongLightState = new StrongLightState(this);
    this.button = null;
  }
  init() {
    let button = document.createElement('button'),
      self = this;

    this.button = document.body.appendChild(button);
    this.button.innerHTML = '开关';

    this.currState = this.offLightState; // 设置当前状态

    this.button.onclick = function () {
      self.currState.buttonWasPressed();
    };
  }
  setState(newState) {
    this.currState = newState;
  }
}

let OffLightState = function (light) {
  this.light = light;
};

OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光'); // offLightState对应的行为
  this.light.setState(this.light.weakLightState); // 切换状态到weakLightState
};

// WeakLightState：

let WeakLightState = function (light) {
  this.light = light;
};

WeakLightState.prototype.buttonWasPressed = function () {
  console.log('强光'); // weakLightState对应的行为
  this.light.setState(this.light.strongLightState); // 切换状态到strongLightState
};

// StrongLightState：

let StrongLightState = function (light) {
  this.light = light;
};

StrongLightState.prototype.buttonWasPressed = function () {
  console.log('关灯'); // strongLightState对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到offLightState
};

let light = new Light();
light.init();
 */
