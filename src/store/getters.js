const getters = {
  getSingerPic:(state)=>{
    return state.singerPic
  },
  getCurrentSinger:(state)=>{
    return state.currentSinger
  },
  getCurrentSongName:(state)=>{
    return state.currentSongName
  },
  getCurrentSingerName:(state)=>{
    return state.currentSingerName
  },
  getCurrentSongId:(state)=> {
    return state.currentSongId
  },
  getCurrentSingerSongs:(state)=> {
    return state.currentSingerSongs
  },
  getCurrentSongPic:(state)=> {
    return state.currentSongPic
  },
  getFull(state){
    return state.full
  }
}

export default getters
