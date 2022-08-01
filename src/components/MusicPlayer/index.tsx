import { useSelector } from 'react-redux'
import Icon from '@ant-design/icons'
import { IconPlaying, IconStopPlaying } from '../Icons'
import useAudio from '@/utils/hooks/useAudio'
import ProgressBar from './ProgressBar'
import { CurrentPlayerMusicInterface } from '@/store/currentPlayMusicSlice'
import { StoreInterface } from '@/store'
import { getMusicUrlString } from '@/utils/function'
import Time from './Time'
import VolumeController from './VolumeController'

const MusicPlayer = () => {
  const { isPlaying, changeAudioToggle } = useAudio()
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>((store) => store.currentPlayerMusic)
  return (
    <div className='flex items-center justify-between h-full pl-24 pr-24 relative'>
      <audio className='music-player' src={getMusicUrlString(currentPlayerMusic.currentMusic.musicId)}></audio>
      {/* 进度条 */}
      <ProgressBar />
      {/* 左侧 */}
      <div className='flex items-center' style={{ color: 'var(--color-white)' }}>
        {/* 播放按钮 */}
        <Icon style={{ width: 32, height: 32 }} component={isPlaying ? IconStopPlaying : IconPlaying} onClick={changeAudioToggle} />
        {/* 名字 and 作者 */}
        <div className='ml-16'>
          <div className='fs-18 fw-bold ellipsis' style={{ maxWidth: 400 }}>
            {currentPlayerMusic.currentMusic.musicName}
          </div>
          <div>{currentPlayerMusic.currentMusic.singerName}</div>
        </div>
      </div>
      {/* 右侧 */}
      <div className='flex items-center'>
        {/* 音量控制 */}
        <VolumeController />
        {/* 歌曲时间 */}
        <Time />
      </div>
    </div>
  )
}

export default MusicPlayer
