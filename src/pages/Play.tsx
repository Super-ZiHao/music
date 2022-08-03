import Icon from '@ant-design/icons'
import { IconAlbum, IconComment, IconLyric, IconMusice1, IconSinger } from '@/components/Icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface } from '@/store/currentPlayMusicSlice'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import useAudio from '@/utils/hooks/useAudio'

type Props = {}

const MusicPlay: React.FC<Props> = () => {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
  const { audio, isPlaying } = useAudio()
  const [selectedLyric, setSelectedLyric] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const lyricMainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCurrentTime(Number(audio?.currentTime.toFixed(2)))
  }, [isPlaying])

  useEffect(() => {
    console.log(isPlaying, currentTime)
    if (!isPlaying || currentTime === 0) return
    let elapsedTime = 0
    let timer: any = setInterval(() => {
      // 获取符合的数组
      currentPlayerMusic.currentMusic.lyric.some((item, index, arr) => {
        let currentPlayerTime = currentTime + elapsedTime
        if (currentPlayerTime > Number(item.time) - 0.5 && currentPlayerTime < arr[index + 1].time) {
          setSelectedLyric(index)
          return true
        }
        return false
      })
      elapsedTime += 0.01
    }, 10)

    return () => {
      clearInterval(timer)
    }
  }, [isPlaying, currentTime])

  useEffect(() => {
    if (!lyricMainRef.current) return
    lyricMainRef.current.children[selectedLyric]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [selectedLyric])
  return (
    <div className='w-full h-full music-play relative'>
      <div className='absolute' style={{ left: 0, top: 0 }}>
        <img className='radius-12' style={{ width: 226, height: 226 }} src={currentPlayerMusic.currentMusicAlbum.url} alt='' />
        <div className='absolute flex column items-start' style={{ top: 24, left: 180 }}>
          <span className='music-label cp p-6 bg-black-transparent color-white-transparent-2 radius-4 no-wrap'>
            {<Icon className='mr-6' component={IconMusice1} style={{ width: 14, height: 14 }} />}
            {currentPlayerMusic.currentMusic.musicName || '未知'}
          </span>
          <span className='music-label cp p-6 bg-black-transparent color-white-transparent-2 radius-4 no-wrap mt-10'>
            {<Icon className='mr-6' component={IconAlbum} style={{ width: 14, height: 14 }} />}
            {currentPlayerMusic.currentMusicAlbum.name || '未知'}
          </span>
          <span className='music-label cp p-6 bg-black-transparent color-white-transparent-2 radius-4 no-wrap mt-10'>
            {<Icon className='mr-6' component={IconSinger} style={{ width: 14, height: 14 }} />}
            {currentPlayerMusic.currentMusic.singerName || '未知'}
          </span>
        </div>
        <div className='mt-24 flex'>
          <Icon className='color-white-transparent-0 transition hover:color-white-transparent-2 cp' component={IconLyric} style={{ width: 22, height: 22 }} />
          <span className='color-white-transparent-0 transition hover:color-white-transparent-2 ml-16 cp flex items-center fs-12'>
            <Icon className='mr-4' component={IconComment} style={{ width: 22, height: 22 }} />
            97.8k
          </span>
        </div>
      </div>
      <div className='absolute flex justify-center lyric text-center'>
        <div className='cp lyric-main' ref={lyricMainRef}>
          {currentPlayerMusic.currentMusic.lyric.map((item, index) => (
            <div key={index} className={`lyric-item color-white-transparent-0 ${selectedLyric === index ? 'selected' : ''}`}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicPlay
