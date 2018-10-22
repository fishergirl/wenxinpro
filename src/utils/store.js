//存储localStorage   删除全部localStorage   window.localStorage.clear();
export const setLocalStorage = (key, value) => {
  if(!window.localStorage)return;
  let data = JSON.stringify(value);
  window.localStorage.setItem(key, data);
};
export const getLocalStorage = key => {
  if(!window.localStorage)return;
  try{
    return JSON.parse(window.localStorage.getItem(key))
  }catch(err){
    removeLocalStorage(key)
  }
};

export const removeLocalStorage = key =>{
	if(!window.localStorage)return;
	window.localStorage.removeItem(key);
}

export const replaceLocalStorage = (key, options) => {
  if (typeof options !== "object") throw 'options must be a Object!';
  let data = getLocalStorage(key);
  if (!data) throw 'the key has not be found in the localStorage!';
  for (let k in data) {
    for (let e in options) {
      if (e == k) {
        data[k] = options[e]
      }
    }
  }
  setLocalStorage(key, data)
};

//存储sessionStorage

export const setSessionStorage = (key, value) => {
	if(!window.sessionStorage)return;
	let data = JSON.stringify(value);
	window.sessionStorage.setItem(key, data);
};
export const getSessionStorage = key => {
	if(!window.sessionStorage)return;
	try{
		return JSON.parse(window.sessionStorage.getItem(key))
	}catch(err){
		removeSessionStorage(key)
	}
}

export const removeSessionStorage = key =>{
	if(!window.sessionStorage)return;
	window.sessionStorage.removeItem(key);
}

export const replaceSessionStorage = (key, options) => {
	if (typeof options !== "object") throw 'options must be a Object!';
	let data = getSessionStorage(key);
	if (!data) throw 'the key has not be found in the sessionStorage!';
	for (let k in data) {
		for (let e in options) {
			if (e == k) {
				data[k] = options[e]
			}
		}
	}
	setSessionStorage(key, data)
};
//js 延迟函数 函数去抖
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）默认·500ms
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export const debounce = function (fn, delay = 500) {
	let timer = null;
	return function (...args) {
		clearTimeout(timer);
		timer = setTimeout(() => {
		  fn.call(this,...args)
    }, delay)
	}
}
