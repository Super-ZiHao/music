import React from 'react'
import Input from '../Input'
import { searchMusicApi } from '@/utils/request/api'
import useDebounce from '@/utils/hooks/useDebounce'
import { useDispatch } from 'react-redux'
import { setMusicList } from '@/store/searchedMusicListSlice'

type Props = {}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [searchMusic] = useDebounce<(value: string) => void>(async (value) => {
    const musics = await searchMusicApi(value)
    dispatch(setMusicList(musics.songs))
  }, 1000)
  return <Input className='search-input no-drag' placeholder='搜索你需要的歌曲~' onEnter={(value) => searchMusic(value)} search />
}

export default Header
