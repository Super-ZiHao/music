import React from 'react'
import Input from '../Input'
import { searchMusicApi } from '@/utils/request/api'
import useDebounce from '@/utils/hooks/useDebounce'

type Props = {}

const Header: React.FC<Props> = () => {
  const [searchMusic] = useDebounce<(value: string) => void>(async (value) => {
    console.log(value)
    const musics = await searchMusicApi(value)
  }, 1000)
  return <Input className='search-input no-drag' placeholder='搜索你需要的歌曲~' onEnter={(value) => searchMusic(value)} search />
}

export default Header
