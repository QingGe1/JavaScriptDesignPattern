// 有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么，
// 此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接收者能够消除彼此之间的耦合关系。
// command setCommand

/*********************************************************************************************/

// js 中命令模式
const bindClick = function (element, command) {
  element.onclick = command;
};

const setCommand = function (element, command) {
  element.onclick = function () {
    command.execute();
  };
};
// 具体行为
const MenuBar = {
  refresh: function () {
    console.log('刷新菜单界面');
  },
};

const SubMenu = {
  add: function () {
    console.log('增加子菜单');
  },
  del: function () {
    console.log('删除子菜单');
  },
};

bindClick(button1, MenuBar.refresh);

/*********************************************************************************************/
// 模拟传统面向对象语言的命令模式实现。
// 命令模式将过程式的请求调用封装在command 对象的execute 方法里，通过封装方法调用，可以把运算块包装成形。

// const setCommand = function (element, command) {
//   element.onclick = function () {
//     command.execute()
//   }
// }
// // 具体行为
// const MenuBar = {
//   refresh: function () {
//     console.log('刷新菜单界面')
//   }
// }

// const SubMenu = {
//   add: function () {
//     console.log('增加子菜单');
//   },
//   del: function () {
//     console.log('删除子菜单');
//   }
// };
// // 把这些行为都封装在命令类中
// const RefreshMenuBarCommand = function (receiver) {
//   this.receiver = receiver
// }

// RefreshMenuBarCommand.prototype.execute = function () {
//   this.receiver.refresh();
// }

// const AddSubMenuCommand = function (receiver) {
//   this.receiver = receiver
// }

// AddSubMenuCommand.prototype.execute = function () {
//   this.receiver.add()
// }

// const DelSubMenuCommand = function (receiver) {
//   this.receiver = receiver
// }

// DelSubMenuCommand.prototype.execute = function () {
//   this.receiver.del()
// }
// // 把命令接收者传入到command 对象中，并且把command 对象安装到button 上面
// const refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
// const addSubMenuCommand = new AddSubMenuCommand(SubMenu);
// const delSubMenuCommand = new DelSubMenuCommand(SubMenu);

// const button1 = document.getElementById('button1');
// const button2 = document.getElementById('button2');
// const button3 = document.getElementById('button3');

// // setCommand(button1, refreshMenuBarCommand);
// // setCommand(button2, addSubMenuCommand);
// // setCommand(button3, delSubMenuCommand);
