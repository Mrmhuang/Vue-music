// import jsonp from "../api/jsonP/jsonp";
import axiosGet from "../api/axios/axios";

export function getRecommed() {
  return axiosGet({
    url:'/dj/banner'
  })
}

export function getRecommendSongs() {
  return axiosGet({
    url:'/personalized'
  })
}

export function getSingers() {
  return axiosGet({
    url:'/top/artists'
  })
}

export class singer {
  constructor(name,pic,firstname='',singerID=0) {
    this.name=name
    this.pic=pic
    this.firstname=firstname
    this.singerID=singerID
  }
}

export function getSingerSongs(id) {
  return axiosGet({
    url:'/artist/top/song',
    params:{
      id
    }
  })
}

