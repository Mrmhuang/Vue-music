//一个快速添加类的js

export default function addClass(el,classN) {
  if(hasClass(el,classN)){
    return
  }else {
    let temp = el.className.split('') //这里不应该有一个空格吗
    temp.push(classN)
    el.className = temp.join(' ')
  }
}

function hasClass(el,classN){
  let zhengze = new RegExp('(^|\\s) + className + (\\s|$)')
  if(zhengze.test(classN)){
    return true
  }else {
    return false
  }
}
