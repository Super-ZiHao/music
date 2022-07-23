import { IconAlbum, IconMusice1, IconSinger, IconSongSheet } from '@/components/Icons'
import MusicList from '@/components/MusicList'
import { StoreInterface } from '@/store'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { SearchMenuKeys } from '@/types/enum'
import Icon from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const items: MenuProps['items'] = [
  {
    label: '单曲',
    key: SearchMenuKeys.MUSIC_MENU,
    icon: <Icon component={IconMusice1} />
  },
  {
    label: '专辑',
    key: SearchMenuKeys.ALBUM_MENU,
    icon: <Icon component={IconAlbum} />
  },
  {
    label: '歌手',
    key: SearchMenuKeys.SINGER_MENU,
    icon: <Icon component={IconSinger} />
  },
  {
    label: '歌单',
    key: SearchMenuKeys.SONGSHEET_MENU,
    icon: <Icon component={IconSongSheet} style={{ width: 16, height: 16 }} />
  }
]
type Props = {}

const Search: React.FC<Props> = () => {
  const [current, setCurrent] = useState<SearchMenuKeys>(SearchMenuKeys.MUSIC_MENU)
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key as SearchMenuKeys)
  }
  const searchedMusicList = useSelector<StoreInterface, SearchedMusicListInterface>((store) => store.searchedMusicList)
  return (
    <div className='flex column search-page' style={{ height: 'calc(100% - 68px - 8px)' }}>
      <Menu mode='horizontal' onClick={onClick} selectedKeys={[current]} items={items} />
      {current === SearchMenuKeys.MUSIC_MENU && <MusicList className='search-page-item' data={searchedMusicList.musics} loading={searchedMusicList.loading} />}
      {current === SearchMenuKeys.ALBUM_MENU && <div>专辑</div>}
      {current === SearchMenuKeys.SINGER_MENU && <div>歌单</div>}
      {current === SearchMenuKeys.SONGSHEET_MENU && <div>歌手</div>}
    </div>
  )
}

export default Search
