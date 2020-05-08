/**
 * @Description:
 * @Author: qingge
 * @Date 2019-06-08 00:19
 */

/*
 * 代理模式的定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。
 *
 * 保护代理 帮助过滤部分操作
 *
 * 虚拟代理 把一些开销很大的对象 延迟到真正需要的时候在创建
 *
 * 缓存代理 缓存一些开销较大的计算
 *
 * 常用的虚拟代理形式：
 * 某一个花销很大的操作，可以通过虚拟代理的方式延迟到这种需要它的时候才去创建（例：使用虚拟代理实现图片懒加载）
 *
 * 图片懒加载的方式：
 * 先通过一张loading图占位，然后通过异步的方式加载图片，等图片加载好了再把完成的图片加载到img标签里面。
 *
 * 使用代理模式实现图片懒加载的优点还有符合单一职责原则。减少一个类或方法的粒度和耦合度。
 * */

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

const imgFunc = (function () {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc(src) {
      imgNode.src = src;
    },
  };
})();

const proxyImage = (function () {
  const img = new Image();
  img.onload = function () {
    console.log('第二次设置src为实际image');
    imgFunc.setSrc(this.src);
  };
  return {
    setSrc(src) {
      console.log('第一次设置src为loading');
      imgFunc.setSrc('./static/loading.gif');
      img.src = src;
    },
  };
})();

proxyImage.setSrc(
  'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559935118744&di=577d5d986b5ef9c6d9e4671ca47bcc91&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0118895a8ad95fa80121923179234a.gif'
);
