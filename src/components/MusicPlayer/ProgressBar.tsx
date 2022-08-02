import React, { useEffect, useRef, useState } from 'react'
import useAudio from '@/utils/hooks/useAudio'
import { AudioListenerUpdate } from '@/types/enum'

type Props = {
  height?: string
}

const ProgressBar: React.FC<Props> = ({ height }) => {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const { duration, currentDuration, changeCurrentDuration } = useAudio(AudioListenerUpdate.TIME)
  const [progress, setProgress] = useState<number>(0) // 进度
  const [flg, setFlg] = useState<boolean>(false)

  // 点击按钮滑动切换时间
  const move = (e: any) => {
    if (!spotRef.current || !progressBarRef.current) return
    setProgress((e.pageX / progressBarRef.current?.offsetWidth) * duration)
  }
  const handleMouseDown = () => {
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', handleMouseUp)
    setFlg(true)
  }
  const handleMouseUp = (e: any) => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', handleMouseUp)
    if (!spotRef.current || !progressBarRef.current) return
    changeCurrentDuration((e.pageX / progressBarRef.current?.offsetWidth) * duration)
    setFlg(false)
  }
  // 监听变化
  useEffect(() => {
    if (!flg) setProgress(currentDuration)
  }, [currentDuration])
  return (
    <div
      ref={progressBarRef}
      className='absolute w-full musicPlayer-progressBar flex'
      // @ts-ignore
      style={{ '--musicPlayer-progressBar-height': height }}
      onClick={(e: any) => {
        changeCurrentDuration((e.pageX / (progressBarRef.current as HTMLDivElement).offsetWidth) * duration)
      }}
    >
      <div
        className='line relative'
        style={{
          // @ts-ignore
          width: `${(progress / duration) * 100}%`
        }}
      />
      {/* 圆点 */}
      <div ref={spotRef} className='spot' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
      <div className='bg-line'></div>
    </div>
  )
}

export default ProgressBar
