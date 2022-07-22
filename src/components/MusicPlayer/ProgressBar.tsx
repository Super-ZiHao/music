import React, { useRef } from 'react'
import useAudio from '@/utils/hooks/useAudio'

type Props = {
  height?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, proportion: number) => void
}

const ProgressBar: React.FC<Props> = ({ height, onClick }) => {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)
  const { audio, duration, currentDuration, changeCurrentDuration } = useAudio(true)

  // 点击按钮滑动切换时间
  const move = (e: any) => {
    if (!spotRef.current || !progressBarRef.current) return
    audio.pause()
    changeCurrentDuration((e.pageX / progressBarRef.current?.offsetWidth) * duration, false)
  }
  const handleMouseDown = () => {
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', handleMouseUp)
  }
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', move)
    window.removeEventListener('mouseup', handleMouseUp)
    audio.play()
  }
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
          width: `${(currentDuration / duration) * 100}%`
        }}
      />
      {/* 圆点 */}
      <div ref={spotRef} className='spot' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} />
      <div className='bg-line'></div>
    </div>
  )
}

export default ProgressBar
