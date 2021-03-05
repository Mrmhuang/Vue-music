import  * as type from './mutations-type'
const actions = {
  allMutationsInSingerDetail({commit,state},{index,singerName,songs}){
    commit(type.SetCurrentSongId,index)
    // console.log(singerName)
    // console.log(songs)
    // commit(type.)
    // commit(type.SetCurrentSingerName,singerName)
    commit(type.SetCurrentSingerName,singerName)
    commit(type.SetCurrentSingerSongs,songs)
    commit(type.SetCurrentSongName,songs[index].al.name)
    commit(type.SetCurrentSongPic,songs[index].al.picUrl)
    commit(type.SetFull)
  }
}

export default actions
