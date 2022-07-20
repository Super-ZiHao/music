import React, { useState } from 'react';
import Input from '../components/Input'
import { Input as AntdInput } from 'antd'

type Props = {};

const Header: React.FC<Props> = () => {
  return (
    <div className='header'>
      <Input
        className='search-input no-drag'
        placeholder='搜索你需要的歌曲~'
        onEnter={(e) => {}}
        search
      />
    </div>
  )
};

export default Header;