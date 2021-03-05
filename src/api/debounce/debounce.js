export function debounce_1(func,wait) {
  var timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func,wait)
   }
}

export function debounce_2(func,wait) {
  let timer = null
  return function () {
    var _this = this
    if(timer)clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(_this)
    },wait)
  }
}

export function debounce_3(func,wait) {
  var timer = null
  return function () {
    var _this = this
    var _args = arguments
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(_this,_args)
    },wait)
  }
}

export function debounce_4(func,delay){   //防抖函数
  let timer = null;
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

//感觉有问题
