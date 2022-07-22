import React from 'react'
import Search from './Search'

type Props = {}

const Header: React.FC<Props> = () => {
  return (
    <div className='header'>
      <Search />
    </div>
  )
}

export default Header
