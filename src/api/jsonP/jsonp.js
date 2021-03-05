import originJSONP from 'jsonp';  //引入jsonp的方法

export default function jsonp(url,data,option) {
  url += url.indent('?') < 0 ? '?' : '&' + param(data)
  return new Promise((resolve, reject)=>{
    originJSONP(url,option,(err,data)=>{   //jsonp调用  相关链接:https://github.com/webmodules/jsonp#jsonpurl-opts-fn
      if(!err){
        resolve(data)
      }else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = ''
  for (var k in data){
    let value = data[k] !== undefined ? data[k]:''
    url += `&${k}=${encodeURIComponent(value)}`  //encodeURIComponent是把url里的相关字符换成%
  }
  return url;
}
