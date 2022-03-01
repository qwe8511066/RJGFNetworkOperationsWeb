/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * 校验obj的对象
 * @param {*} obj 
 */
export function checkObjectString(obj, name) {
  let item = getMultistage(obj, name);
  const value = item && typeof (item) == 'object' ? null : item;
  return value;
}

export function getMultistage(data, index) {
  let temp = data;
  let path = index.split('.');
  if (path.length < 2) {
    return data[index]
  }
  for (let index = 0; index < path.length; index++) {
    if (temp[path[index]]) {
      temp = temp[path[index]]
    }
  }
  return temp
}

/**
 * 数组中单独判断
 * @param array 数组
 * @param checkAttribute  判断的属性
 * @param typeString 校验的属性
 * @param return  boolean
 */
export function checkArrayString(array, arrayType, typeString) {
  let index = -1;
  // console.log(arrayType);
  // console.log()
  if (Array.isArray(array)) {
    for (let i = 0; i < array.length; i++) {
      const type = arrayType.split('.').length < 2 ? (arrayType && array[i][arrayType] == typeString) || (!arrayType && array[i] == typeString) : getMultistage(array[i], arrayType) == typeString
      // if(arrayType.split('.').length<2){
      //   if ((arrayType && array[i][arrayType] == typeString) || (!arrayType && array[i] == typeString)) {        
      //     index = i;
      //     break;
      //   }
      // }else{
      //   if (getMultistage(array[i],arrayType) == typeString) {        
      //     index = i;
      //     break;
      //   }
      // } 
      if (type) {
        index = i;
        break;
      }
    }
  } else {
    throw new Error('传入的类型错误');
  }
  return index;
}

export function checkArray(array) {
  return array && array.length > 0;
}


/**
 * 删除最后一个逗号
 */
export function removeComma(str) {
  return str.replace(/,$/gi, "");
}

export function uuid() {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}


export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}


export function tiledChildren(tree) {
  let arr = [];
  const expanded = datas => {
    if (datas && datas.length > 0) {
      datas.forEach(e => {
        const value = JSON.parse(JSON.stringify(e));
        delete value.children
        arr.push(value);
        expanded(e.children);
      })
    }
  };
  expanded(tree);
  return arr;
}
