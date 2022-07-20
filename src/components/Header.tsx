import React from 'react';
import Input from '../components/Input'

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <div className='header'>
      <Input
        className='search-input no-drag'
        placeholder='搜索你需要的歌曲~'
      />
    </div>
  )
};

export default Header;