import axiosGet from "../api/axios/axios";

export function getLyric(id) {
  return axiosGet({
    url:'/lyric',
    params:{
      id
    }
  })
}
