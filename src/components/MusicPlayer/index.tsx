import { useSelector } from 'react-redux'
import Icon from '@ant-design/icons'
import { IconPlaying, IconStopPlaying } from '../Icons'
import useAudio from '@/utils/hooks/useAudio'
import ProgressBar from './ProgressBar'
import { MusicInterface } from '@/store/currentPlayMusicSlice'
import { StoreInterface } from '@/store'
import { getMusicUrlString } from '@/utils/function'

const MusicPlayer = () => {
  const { isPlaying, changeAudioToggle } = useAudio()

  const music = useSelector<StoreInterface, MusicInterface>((store) => store.currentPlayerMusic)
  // // 全局空格
  // useEffect(() => {
  //   const audio = audioRef.current;
  //   if (!audio) return;
  //   const handleKeyDonw = (e: any) => {
  //     if (e.code === "Space") handleToggle();
  //   };
  //   // 增加全局空格控制音乐
  //   window.addEventListener("keydown", handleKeyDonw);
  //   return () => window.removeEventListener("keydown", handleKeyDonw);
  // }, []);
  return (
    <div className='flex items-center justify-between h-full pl-24 pr-24 relative'>
      <audio className='music-player' src={getMusicUrlString(music.musicId)}></audio>
      {/* 进度条 */}
      <ProgressBar />
      {/* 左侧 */}
      <div className='flex items-center' style={{ color: 'var(--color-white)' }}>
        {/* 播放按钮 */}
        <Icon style={{ width: 32, height: 32 }} component={isPlaying ? IconStopPlaying : IconPlaying} onClick={changeAudioToggle} />
        {/* 名字 and 作者 */}
        <div className='ml-16'>
          <div className='fs-18 fw-bold ellipsis' style={{ maxWidth: 200 }}>
            {music.musicName}
          </div>
          <div>{music.singerName}</div>
        </div>
      </div>
      {/* 右侧 */}
      <div></div>
    </div>
  )
}

export default MusicPlayer
