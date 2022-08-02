import Icon from '@ant-design/icons'
import { IconAlbum, IconComment, IconLyric, IconMusice1, IconSinger } from '@/components/Icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface, getLyric } from '@/store/currentPlayMusicSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

type Props = {}

const MusicPlay: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
  return (
    <div className='w-full h-full relative'>
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
      <div className='absolute' style={{ width: 400, top: 0, right: 0 }}>
        {currentPlayerMusic.currentMusic.lyric}
      </div>
    </div>
  )
}

export default MusicPlay
