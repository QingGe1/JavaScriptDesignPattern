let Upload = function (uploadType) {
  console.log('call');
  this.uploadType = uploadType;
};
// 缺少上传等方法
Upload.prototype.delFile = function (id) {
  // 全局变量
  uploadManager.setExternalState(id, this);

  if (this.fileSize < 3000) {
    return this.dom.parentNode.removeChild(this.dom);
  }

  if (window.confirm(`确定要删除该文件吗? ${this.fileName}`)) {
    return this.dom.parentNode.removeChild(this.dom);
  }
};

let UploadFactory = (function () {
  let createdFlyWeightObjs = {};
  return {
    create: function (uploadType) {
      if (createdFlyWeightObjs[uploadType]) {
        return createdFlyWeightObjs[uploadType];
      }
      return (createdFlyWeightObjs[uploadType] = new Upload(uploadType));
    },
  };
})();

const uploadManager = (function () {
  let uploadDatabase = {};
  return {
    add: function (id, uploadType, fileName, fileSize) {
      let flyWeightObj = UploadFactory.create(uploadType);

      let dom = document.createElement('div');
      dom.innerHTML =
        `<span>文件名称:${fileName}, 文件大小: ${fileSize}</span>` +
        '<button class="delFile">删除</button>';

      dom.querySelector('.delFile').onclick = function () {
        flyWeightObj.delFile(id);
      };
      document.body.appendChild(dom);

      uploadDatabase[id] = {
        fileName,
        fileSize,
        dom,
      };
      return flyWeightObj;
    },
    setExternalState: function (id, flyWeightObj) {
      let uploadData = uploadDatabase[id];
      for (let i in uploadData) {
        flyWeightObj[i] = uploadData[i];
      }
    },
  };
})();

let id = 0;

const startUpload = function (uploadType, files) {
  for (let i = 0, file; i < files.length; i++) {
    file = files[i];
    let uploadObj = uploadManager.add(
      ++id,
      uploadType,
      file.fileName,
      file.fileSize
    );
  }
};

startUpload('plugin', [
  {
    fileName: '1.txt',
    fileSize: 1000,
  },
  { fileName: '2.html', fileSize: 3000 },
  {
    fileName: '3.txt',
    fileSize: 5000,
  },
]);

startUpload('flash', [
  {
    fileName: '4.txt',
    fileSize: 1000,
  },
  {
    fileName: '5.html',
    fileSize: 3000,
  },
  {
    fileName: '6.txt',
    fileSize: 5000,
  },
]);
