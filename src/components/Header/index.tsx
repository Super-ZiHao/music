import { StoreInterface } from '@/store'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { handleCloseWin, handleMaxWin, handleMinWin, handleUnMaxWin } from '@/utils/electonFuns'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Search from './Search'
import Icon, { MinusOutlined } from '@ant-design/icons'
import { IconClose, IconMaxWin, IconMinWin, IconUnMaxWin } from '../Icons'

type Props = {}

const Header: React.FC<Props> = () => {
  const musicList = useSelector<StoreInterface, SearchedMusicListInterface>(store => store.searchedMusicList)
  const [isMax, setIsMax] = useState<boolean>(false) // 是否最大化

  return (
    <div className='header relative'>
      <Search />
      <div className='absolute flex items-center justify-center' style={{ right: 0 }}>
        <Icon onClick={() => handleMinWin()} component={IconMinWin} style={{ width: 28, color: 'var(--color-white)' }} />
        <Icon
          className='ml-4'
          onClick={() => {
            isMax ? handleUnMaxWin() : handleMaxWin()
            setIsMax(!isMax)
          }}
          component={isMax ? IconUnMaxWin : IconMaxWin}
          style={{ width: 20, color: 'var(--color-white)' }}
        />
        <Icon className='ml-4' onClick={() => handleCloseWin()} component={IconClose} style={{ width: 24, color: 'var(--color-white)' }} />
      </div>
    </div>
  )
}

export default Header
