import React from 'react';
import { BarChartOutlined, CustomerServiceOutlined, HeartOutlined, UnorderedListOutlined } from '@ant-design/icons';

type Props = {};

const Menu: React.FC<Props> = () => {
  return (
    <div className='menu'>
      <div className='flex justify-center'><CustomerServiceOutlined className='icon' /></div>
      <div className='flex justify-center'><UnorderedListOutlined className='icon' /></div>
      <div className='flex justify-center'><HeartOutlined className='icon' /></div>
      <div className='flex justify-center'><BarChartOutlined className='icon' /></div>
    </div>
  )
};

export default Menu;