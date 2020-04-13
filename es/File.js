import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.object.to-string';
import 'core-js/modules/es6.typed.uint8-array';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.regexp.split';
import 'core-js/modules/es6.function.name';

/** file */

/**
 * file转base64
 * @param { * } - file 图片文件
 */
var fileToBase64 = function fileToBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    return e.target.result;
  };
};
/**
 * blob转file
 * @param { blob } - blob
 * @param { string } - fileName
 */

var blobToFile = function blobToFile(blob, fileName) {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return blob;
};
/**
 * base64转blob
 * @param { base64 } base64
 */

var base64ToBlob = function base64ToBlob(base64) {
  var arr = base64.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {
    type: mime
  });
};
/**
 * base64转file
 * @param { base64 } - base64
 * @param { string } - filename 转换后的文件名
 */

var base64ToFile = function base64ToFile(base64, filename) {
  var arr = base64.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var suffix = mime.split('/')[1]; // 图片后缀

  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], "".concat(filename, ".").concat(suffix), {
    type: mime
  });
};
/**
 * B转换到KB,MB,GB并保留两位小数
 * @param { number } fileSize
 */

function formatFileSize(fileSize) {
  var temp;

  if (fileSize < 1024) {
    return fileSize + 'B';
  } else if (fileSize < 1024 * 1024) {
    temp = fileSize / 1024;
    temp = temp.toFixed(2);
    return temp + 'KB';
  } else if (fileSize < 1024 * 1024 * 1024) {
    temp = fileSize / (1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'MB';
  } else {
    temp = fileSize / (1024 * 1024 * 1024);
    temp = temp.toFixed(2);
    return temp + 'GB';
  }
}
/**
 * 获取文件base64编码
 * @param file
 * @param format  指定文件格式
 * @param size  指定文件大小(字节)
 * @param formatMsg 格式错误提示
 * @param sizeMsg   大小超出限制提示
 * @returns {Promise<any>}
 */

function fileToBase64String(file) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['jpg', 'jpeg', 'png', 'gif'];
  var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20 * 1024 * 1024;
  var formatMsg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '文件格式不正确';
  var sizeMsg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '文件大小超出限制';
  return new Promise(function (resolve, reject) {
    // 格式过滤
    var suffix = file.type.split('/')[1].toLowerCase();
    var inFormat = false;

    for (var i = 0; i < format.length; i++) {
      if (suffix === format[i]) {
        inFormat = true;
        break;
      }
    }

    if (!inFormat) {
      reject(formatMsg);
    } // 大小过滤


    if (file.size > size) {
      reject(sizeMsg);
    } // 转base64字符串


    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = function () {
      var res = fileReader.result;
      resolve({
        base64String: res,
        suffix: suffix
      });
      reject('异常文件，请重新选择');
    };
  });
}

export { base64ToBlob, base64ToFile, blobToFile, fileToBase64, fileToBase64String, formatFileSize };
