import { useSelector } from 'react-redux'
import Icon from '@ant-design/icons'
import { IconCutSong, IconPlaying, IconStopPlaying } from '../Icons'
import useAudio from '@/utils/hooks/useAudio'
import ProgressBar from './ProgressBar'
import { CurrentPlayerMusicInterface } from '@/store/currentPlayMusicSlice'
import { StoreInterface } from '@/store'
import { getMusicUrlString } from '@/utils/function'
import Time from './Time'
import VolumeController from './VolumeController'
import { useEffect } from 'react'
import SongList from './SongList'

type Props = {
  el?: string
}

const MusicPlayer = ({}) => {
  const { changeAudioToggle, audio } = useAudio()
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>((store) => store.currentPlayerMusic)
  return (
    <div className='flex items-center justify-between h-full pl-24 pr-24 relative'>
      {/* 进度条 */}
      <ProgressBar />
      {/* 左侧 */}
      <div className='flex items-center' style={{ color: 'var(--color-white)' }}>
        {/* 播放按钮 */}
        <div className='flex items-center gap-12'>
          <Icon style={{ width: 32, height: 32, transform: 'rotate(180deg)' }} component={IconCutSong} onClick={() => console.log('上一首')} />
          <Icon style={{ width: 32, height: 32 }} component={!audio?.paused ? IconStopPlaying : IconPlaying} onClick={changeAudioToggle} />
          <Icon style={{ width: 32, height: 32 }} component={IconCutSong} onClick={() => console.log('下一首')} />
        </div>
        {/* 名字 and 作者 */}
        <div className='ml-16'>
          <div className='fs-18 fw-bold ellipsis' style={{ maxWidth: 400 }}>
            {currentPlayerMusic.currentMusic.musicName || '未知'}
          </div>
          <div>{currentPlayerMusic.currentMusic.singerName || '未知'}</div>
        </div>
      </div>
      {/* 右侧 */}
      <div className='flex items-center gap-12'>
        {/* 列表 */}
        <SongList data={currentPlayerMusic.currentMusicList.data} />
        {/* 音量控制 */}
        <VolumeController />
        {/* 歌曲时间 */}
        <Time />
      </div>
    </div>
  )
}

export default MusicPlayer
