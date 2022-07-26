import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { getHotSearchApi, getSuggestApi, searchMusicApi } from '@/utils/request/api'
import { useDispatch } from 'react-redux'
import { setMusicList, setMusicListLoading } from '@/store/searchedMusicListSlice'
import useThrottle from '@/utils/hooks/useThrottle'
import useDebounce from '@/utils/hooks/useDebounce'

const SearchBoxComponent: React.FC<{ title: string; searchData: any; onClick: (value: string) => void }> = ({ title, searchData, onClick }) => {
  return (
    <div className='pt-4 pb-4'>
      <div className='fs-14 ml-8' style={{ marginBottom: -2 }}>
        {title}
      </div>
      <div className='mt-4'>
        {searchData.map((item: any, index: number) => (
          <div
            className='flex items-center item p-8'
            onClick={() => {
              console.log(item.searchWord)
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

type Props = {}

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>('')
  const [hotSearch, setHotSearch] = useState<any>() // 热门搜索
  const [suggest, setSuggest] = useState<any>() // 搜索建议

  // const getSuggest = useDebounce(async (value: string) => {
  //   const suggest = await getSuggestApi(value)
  //   console.log(suggest)
  // }, 500)
  useEffect(() => {
    // getSuggest(inputValue)
  }, [inputValue])

  // 获取搜索到的值
  const searchMusic = useThrottle<(value: string) => void>(async value => {
    dispatch(setMusicListLoading(true))
    const musics = await searchMusicApi(value)
    dispatch(setMusicList(musics.songs))
  }, 2000)

  // 聚焦获取热门搜索
  const handleFocus = useThrottle(
    async () => {
      if (hotSearch) return
      setHotSearch(await getHotSearchApi(true))
    },
    2000,
    [hotSearch]
  )

  // 点击搜索展示框内的值
  const handleSearch = (value: string) => {
    setInputValue(value)
    searchMusic(value)
  }
  return (
    <Input
      className='search-input no-drag'
      placeholder='搜索你需要的歌曲~'
      onEnter={value => searchMusic(value)}
      onFocus={handleFocus}
      value={inputValue}
      onChange={value => setInputValue(value)}
      search
      searchBoxClassName='search-input-box'
      searchBoxComponent={hotSearch && <SearchBoxComponent title='热搜榜单' searchData={hotSearch} onClick={handleSearch} />}
    />
  )
}

export default Header
