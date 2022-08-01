import React, { useEffect, useState } from 'react'
import Input from '../Input'
import { getHotSearchApi, getSuggestApi, searchMusicApi } from '@/utils/request/api'
import { useDispatch } from 'react-redux'
import { setMusicList, setMusicListLoading } from '@/store/searchedMusicListSlice'
import useThrottle from '@/utils/hooks/useThrottle'
import useDebounce from '@/utils/hooks/useDebounce'
import { useNavigate } from 'react-router-dom'

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

/** 搜索建议组件 */
const SuggestComponent = () => <div>123</div>
type Props = {}

const Header: React.FC<Props> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState<string>('')
  const [hotSearch, setHotSearch] = useState<hotSearchDataType>() // 热门搜索
  const [suggest, setSuggest] = useState<any>() // 搜索建议

  // 搜索
  const handleSeach = (value: string) => {
    searchMusic(value)
    navigate('/search', {
      replace: true
    })
  }

  // 获取建议
  const getSuggest = useDebounce(async (value: string) => {
    if (value.trim().length < 1) return
    setSuggest(await getSuggestApi(value))
  }, 1000)

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
    handleSeach(value)
  }

  useEffect(() => {
    getSuggest(inputValue)
  }, [inputValue])

  return (
    <Input
      className='search-input no-drag'
      placeholder='搜索你需要的歌曲~'
      onEnter={handleSeach}
      onFocus={handleFocus}
      value={inputValue}
      onChange={value => setInputValue(value)}
      search
      searchBoxClassName='search-input-box'
      searchBoxComponent={suggest ? <SuggestComponent /> : hotSearch && <HotSearchComponent searchData={hotSearch} onClick={handleSearch} />}
    />
  )
}

export default Header
