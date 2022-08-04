import { getAlbum, getLyric, getMusicUrl, setCurrentMusic } from "@/store/currentPlayMusicSlice"
import { MusicType } from "@/types/type"
import { useDispatch } from "react-redux"

const useGetCurrentMusicAllData = () => {
  const dispatch = useDispatch()
  return (item: MusicType) => {
    dispatch(setCurrentMusic(item)) // 同步——基础信息
    dispatch(getAlbum(item.albumId) as any) // 异步——封面
    dispatch(getLyric(item.musicId) as any) // 异步——歌词
    dispatch(getMusicUrl(item.musicId) as any) // 异步——地址
  }
}

export default useGetCurrentMusicAllData