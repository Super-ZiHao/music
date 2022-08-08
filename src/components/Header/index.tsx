import { StoreInterface } from '@/store'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
// import { handleCloseWin, handleChangeMaxWin, handleMinWin } from '@/utils/electonFuns'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Search from './Search'
import Icon from '@ant-design/icons'
import { IconBack, IconClose, IconForward, IconMaxWin, IconMinWin, IconUnMaxWin } from '../Icons'

type Props = {}

const Header: React.FC<Props> = () => {
  const musicList = useSelector<StoreInterface, SearchedMusicListInterface>(store => store.searchedMusicList)
  const [isMax, setIsMax] = useState<boolean>(false) // 是否最大化

  // 最大化 ｜ 取消最大化
  const toggleMaxWin = () => {
    setIsMax(!isMax)
  }

  return (
    <div className='header relative' onDoubleClick={toggleMaxWin}>
      <div className='ml-16'>
        <Search />
      </div>
      <div className='absolute flex items-center justify-center' style={{ right: 16 }}>
        <Icon className='no-drag cp' component={IconMinWin} style={{ width: 28, color: 'var(--color-white)' }} />
        <Icon className='ml-4 no-drag cp' component={isMax ? IconUnMaxWin : IconMaxWin} style={{ width: 20, color: 'var(--color-white)' }} />
        <Icon className='ml-4 no-drag cp' component={IconClose} style={{ width: 24, color: 'var(--color-white)' }} />
      </div>
    </div>
  )
}

export default Header
