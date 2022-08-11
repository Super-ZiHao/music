import React, { useState } from 'react'
import Input from '../Input'
import { getHotSearchApi, getSuggestApi } from '@/utils/request/api'
import { useDispatch } from 'react-redux'
import { getSearchMusicList, setMusicListLoading } from '@/store/searchedMusicListSlice'
import useThrottle from '@/utils/hooks/useThrottle'
import useDebounce from '@/utils/hooks/useDebounce'
import { useNavigate, useLocation } from 'react-router-dom'

type hotSearchDataType = {
  searchWord: string
  score: string
  iconUrl?: string
  content?: string
}[]
/** 热门搜索组件 */
const HotSearchComponent: React.FC<{ searchData: hotSearchDataType; onClick: (value: string) => void }> = ({ searchData, onClick }) => {
  return (
    <div className='pt-4 pb-4'>
      <div className='fs-14 ml-8' style={{ marginBottom: -2 }}>
        热搜榜单
      </div>
      <div className='mt-4'>
        {searchData.map((item: any, index: number) => (
          <div
            className='flex items-center item p-8'
            onClick={() => {
              onClick(item.searchWord)
            }}
            key={index}
          >
            <div className='ml-4 ranking'>{index + 1}</div>
            <div className='ml-16 fs-12'>
              <div className='flex items-center ellipsis'>
                <span style={{ color: '#FEF9A7' }}>{item.searchWord}</span>
                <span className='ml-8 fs-10'>{item.score}</span>
                {item.iconUrl && <img className='ml-12' src={item.iconUrl} height={12} />}
              </div>
              <div className='ellipsis' style={{ width: 210 }}>
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

type SuggestDataType = {
  songs: { musicName: string, singerName: string, id: number }[]
  artists: { singerName: string, id: number }[]
  albums: { albumName: string, singerName: string, id: number }[]
}
/** 搜索建议组件 */
const SuggestComponent: React.FC<{ data: SuggestDataType; onClick: (value: string) => void }> = ({ data, onClick }) => {
  return (
    <div className='suggest p-4'>
      {/* 单曲 */}
      {data.songs.length > 0 && <>
        <div className='fw-bold' style={{ color: '#3db2ff' }}>单曲</div>
        <div>
          {data.songs.map(item => <div className='suggest-item item pl-10 radius-4 cp fs-12 flex items-center ellipsis' key={item.id} onClick={() => onClick(item.musicName)}>{item.musicName} - {item.singerName}</div>)}
        </div>
      </>}
      {/* 歌手 */}
      {data.artists.length > 0 && <>
        <div className='fw-bold' style={{ color: '#ffb830' }}>歌手</div>
        <div>
          {data.artists.map(item => <div className='suggest-item item pl-10 radius-4 cp fs-12 flex items-center ellipsis' key={item.id}>{item.singerName}</div>)}
        </div>
      </>}
      {/* 专辑 */}
      {data.albums.length > 0 && <>
        <div className='fw-bold' style={{ color: '#ffedda' }}>专辑</div>
        <div>
          {data.albums.map(item => <div className='suggest-item item pl-10 radius-4 cp fs-12 flex items-center ellipsis' key={item.id}>{item.albumName} - {item.singerName}</div>)}
        </div>
      </>}
    </div>
  )
}
type Props = {}

const Header: React.FC<Props> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>('')
  const [hotSearch, setHotSearch] = useState<hotSearchDataType>() // 热门搜索
  const [suggest, setSuggest] = useState<SuggestDataType>() // 搜索建议

  // 搜索
  const handleSeach = (value: string) => {
    if (value.length === 0) return
    searchMusic(value)
  }

  // 获取建议
  const getSuggest = useDebounce(async (value: string) => {
    if (value.trim().length < 1) return
    setSuggest(await getSuggestApi(value))
  }, 1000)

  // 获取搜索到的值
  const searchMusic = useThrottle<(name: string) => void>(async name => {
    dispatch(getSearchMusicList({ name }) as any)
  }, 2000)

  // 聚焦获取热门搜索
  const handleFocus = useThrottle(
    async () => {
      navigate('/search', {
        replace: true
      })
      if (hotSearch) return
      setHotSearch(await getHotSearchApi(true))
    },
    500,
    [hotSearch]
  )

  // 点击搜索展示框内的值
  const handleSearch = (value: string) => {
    setInputValue(value)
    navigate('/search', {
      replace: true
    })
    handleSeach(value)
  }

  return (
    <Input
      className={`search-input ${location.pathname === '/search' ? 'is-search-page' : ''} no-drag`}
      placeholder='搜索你需要的歌曲~'
      onEnter={handleSeach}
      onFocus={handleFocus}
      value={inputValue}
      onChange={value => {
        setInputValue(value)
        setSuggest(undefined)
        getSuggest(inputValue)
      }}
      search
      searchBoxClassName='search-input-box'
      searchBoxComponent={suggest && inputValue ? <SuggestComponent data={suggest} onClick={handleSearch} /> : hotSearch && <HotSearchComponent searchData={hotSearch} onClick={handleSearch} />}
    />
  )
}

export default Header
