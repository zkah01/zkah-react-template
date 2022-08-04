const loginUserInfo = JSON.parse(localStorage.getItem('user')) || {};
const { accessKeyId, accessKeySecret, bucketName, prefix } = loginUserInfo.ossConfig || {};
/**
 * 阿里云oss上传工具
 */
const OSS = require('ali-oss');
const config = {
  region: 'oss-cn-hangzhou',
  accessKeyId,
  accessKeySecret,
  bucket: bucketName,
  secure: true,
};

/**
 * 配置
 */
const init = () => {
  return new OSS(config);
};

/**
 * 生成uuid
 */
const guid = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

/**
 * 修改文件名字
 */
const fileName = (file) => {
  var uuid = prefix + '/oss' + guid();
  if (file.name) {
    const arr = file.name.split('.');
    if (arr.length > 1) {
      let suffix = arr[arr.length - 1];
      if (suffix === 'pdf') {
        suffix = 'PDF';
      }
      return uuid + '.' + suffix;
    } else {
      return uuid;
    }
  } else {
    return `${uuid}.png`;
  }
};

const ossPut = (file) => {
  return new Promise((resolve, reject) => {
    const objectName = fileName(file);
    init()
      .put(objectName, file, {
        headers: {
          // attachment; filename=%E8%87%AA%E5%BB%BA%E6%88%BF%E6%83%85%E5%86%B5%E6%A0%B8%E5%AE%9E%E8%A1%A8(1).pdf
          'Content-Disposition': 'attachment; filename=' + encodeURIComponent(file.name),
          'Content-Encoding': 'UTF-8',
          'Content-Type': 'application/octet-stream',
        },
      })
      .then(({ res, url }) => {
        if (res && res.status === 200) {
          // console.log('阿里云OSS上传文件成功回调', res, url);
          resolve(res, url);
        }
      })
      .catch((err) => {
        console.log('阿里云OSS上传文件失败回调', err);
        reject(err);
      });
  });
};

/**
 * 下载文件
 */
const ossGet = (name) => {
  return new Promise((resolve, reject) => {
    init()
      .get(name)
      .then(({ res }) => {
        if (res && res.status === 200) {
          // console.log('阿里云OSS下载文件成功回调', res);
          resolve(res);
        }
      })
      .catch((err) => {
        console.log('阿里云OSS下载文件失败回调', err);
        reject(err);
      });
  });
};

export { ossPut, ossGet };
