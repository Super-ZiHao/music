import React from 'react';
import { BarChartOutlined, CustomerServiceOutlined, HeartOutlined, UnorderedListOutlined } from '@ant-design/icons';

type Props = {};

const Menu: React.FC<Props> = () => {
  return (
    <div className='menu'>
      <CustomerServiceOutlined className='icon' />
      <UnorderedListOutlined className='icon' />
      <HeartOutlined className='icon' />
      <BarChartOutlined className='icon' />
    </div>
  )
};

export default Menu;