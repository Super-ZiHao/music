import { Album, Musice1, songSheet } from '@/components/Icons';
import Icon, { UserOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const Search: React.FC<Props> = () => {
  const items: MenuProps['items'] = [
    {
      label: '歌曲',
      key: 'mail',
      icon: <Icon component={Musice1} />
    },
    {
      label: '专辑',
      key: 'app',
      icon: <Icon component={Album} />
    },
    {
      label: '歌手',
      key: 'app1',
      icon: <UserOutlined />
    },
    {
      label: '歌单',
      key: 'app2',
      icon: <Icon component={songSheet} style={{ width: 16, height: 16 }} />
    },
  ];
  const [current, setCurrent] = useState('mail');
  const onClick: MenuProps['onClick'] = e => {
    setCurrent(e.key);
  };
  return (
    <div className='h-full'>
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
      />
      <Outlet />
    </div>
  )
};

export default Search;