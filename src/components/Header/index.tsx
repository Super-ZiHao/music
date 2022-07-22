import { StoreInterface } from '@/store'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import Search from './Search'

type Props = {}

const Header: React.FC<Props> = () => {
  const musicList = useSelector<StoreInterface, SearchedMusicListInterface>((store) => store.searchedMusicList)

  return (
    <div className='header'>
      <Search />
      <button onClick={() => console.log(musicList)}>{musicList.musics[0].musicName}</button>
    </div>
  )
}

export default Header
