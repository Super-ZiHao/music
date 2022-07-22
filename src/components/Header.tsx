import React from 'react'
import Input from '../components/Input'
import { getMusic } from '@/utils/request/api'
import useDebounce from '@/utils/hooks/useDebounce'

type Props = {}

const Header: React.FC<Props> = () => {
  const [searchMusic, loading] = useDebounce<(value: string) => void>(async (value) => {
    const musics = await getMusic(value)
  }, 1000)
  return (
    <div className='header'>
      <Input className='search-input no-drag' placeholder='搜索你需要的歌曲~' onEnter={(value) => searchMusic(value)} search />
    </div>
  )
}

export default Header
