const mutations = {
  pushSingerPic(state,pic){
    state.singerPic.push(pic)
  },
  setCurrentSinger(state,index){
    state.currentSinger = index
  },
  SetCurrentSongName:(state,SongName)=>{
    state.currentSongName = SongName
  },
  SetCurrentSingerName:(state,SingerName)=>{
    state.currentSingerName = SingerName
  },
  SetCurrentSongPic:(state,pic)=>{
    state.currentSongPic = pic
  },
  SetCurrentSongId(state,id){
    state.currentSongId = id
  },
  SetCurrentSingerSongs(state,songs){
    state.currentSingerSongs = songs
  },
  SetFull:(state)=>{
    state.full = !state.full
  }
}

export default mutations
