import Icon from '@ant-design/icons'
import { IconAlbum, IconComment, IconLyric, IconMusice1, IconSinger } from '@/components/Icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface } from '@/store/currentPlayMusicSlice'
import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import useAudio from '@/utils/hooks/useAudio'
import { GlobalStateInterface } from '@/store/globalStateSlice'
import { AudioListenerUpdate } from '@/types/enum'

type Props = {}

const MusicPlay: React.FC<Props> = () => {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
  const globalState = useSelector<StoreInterface, GlobalStateInterface>(store => store.globalState)
  const { currentDuration } = useAudio(AudioListenerUpdate.TIME)
  const [selectedLyric, setSelectedLyric] = useState<number>(-1)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const lyricMainRef = useRef<HTMLDivElement>(null)

  // 监听当前歌词的index变化并滚动
  useEffect(() => {
    if (!lyricMainRef.current) return
    lyricMainRef.current.children[selectedLyric]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [selectedLyric])
  // 获取符合的那一段歌词的 index
  useEffect(() => {
    currentPlayerMusic.currentMusic.lyric.some((item, index, arr) => {
      if (arr[index + 1]) {
        if (currentDuration > Number(item.time) && currentDuration < arr[index + 1]?.time) {
          setSelectedLyric(index)
          return true
        }
      } else {
        if (currentDuration > Number(item.time)) {
          if (selectedLyric === index) return true
          setSelectedLyric(index)
          return true
        }
      }
      return false
    })
  }, [currentTime, currentDuration])

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
