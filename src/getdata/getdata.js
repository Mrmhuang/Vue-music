// export function getdata(el,name,val) {
//   const prev = 'data-'
//   name = prev + name
//   if(val){
//     return el.setAttribute(prev+name,val)
//   }else {
//     return el.getAttribute(name)
//   }
// }

export function getdata (el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    // 如果有 val 就添加这个 val 到 dom 中
    // name="val"
    return el.setAttribute(name, val)
  } else {
    // 没有 val ，就获取 dom 中的 name
    return el.getAttribute(name)
  }
}
