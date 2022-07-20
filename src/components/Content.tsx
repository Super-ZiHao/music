import React from 'react';

type Props = {};

const Content: React.FC<Props> = () => {
  return <div className='h-full grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
    <div style={{ backgroundColor: 'blue' }}>
      
    </div>
    <div style={{ backgroundColor: 'orange' }}></div>
  </div>
};

export default Content;