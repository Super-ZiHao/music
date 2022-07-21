import React from 'react';

type Props = {
  // 总时长
  totalDuration: number;
  // 当前时长
  currentDuration: number;
  height?: string
  onChange?: (e) => void
};

const ProgressBar: React.FC<Props> = ({ totalDuration, currentDuration, height, onChange}) => {
  const handleChange = (e: any) => {
    onChange?.(e.pageX / e.target.offsetWidth)
  }
  return (
    <div
      className='absolute w-full musicPlayer-progressBar'
      // @ts-ignore
      style={{ "--musicPlayer-progressBar-height": height }}
      onClick={handleChange}
    >
      <div
        className='line h-full relative'
        style={{
          // @ts-ignore
          width: `${currentDuration / totalDuration * 100}%`,
        }}
      >
      </div>
    </div>
  )
};

export default ProgressBar;