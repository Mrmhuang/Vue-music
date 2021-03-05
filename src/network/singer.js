import axiosGet from "../api/axios/axios";

export function getSongs(id) {
  return axiosGet({
    url:'/artist/songs',
    params:{
      id
    }
  })
}

// export class songsData{
//   constructor(singerName,songName,picUrl,) {
//
//   }
// }
