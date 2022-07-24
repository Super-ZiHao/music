import { setCurrentMusic } from '@/store/currentPlayMusicSlice'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { getTotalDuration } from '@/utils/function/time'
import useAudio from '@/utils/hooks/useAudio'
import { useDispatch } from 'react-redux'

type Props = {
  className?: string
  loading?: boolean
  data: SearchedMusicListInterface
}

const MusicList: React.FC<Props> = (props) => {
  const { className = '', loading = false, data } = props
  if (loading) {
    return <div>正在查询歌曲</div>
  }
  if (!(data.musics.length > 0)) {
    return <div>请先搜索你想听的歌曲</div>
  }
  const dispatch = useDispatch()
  const { audio } = useAudio()
  return (
    <div className={`music-list ${className}`}>
      <div className='flex items-center title'>
        <div style={{ width: 80 }}></div>
        <div style={{ width: 200 }}>音乐标题</div>
        <div className='flex-1'>歌手</div>
        <div className='flex-1'>专辑</div>
        <div style={{ width: 120 }}>时长</div>
      </div>
      <div className='music-list-main'>
        {data.musics.map((item, index) => (
          <div
            key={item.musicId}
            className={`flex items-center item`}
            onDoubleClick={() => {
              dispatch(setCurrentMusic(item))
              setTimeout(() => {
                audio.play()
              }, 0)
            }}
          >
            {/* 排名 */}
            <div className='ranking-top' style={{ width: 80 }}>
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </div>
            {/* 音乐名称 */}
            <div className='ellipsis' style={{ width: 200 }}>
              {item.musicName}
            </div>
            {/* 歌手名称 */}
            <div className='ellipsis flex-1'>{item.singerName}</div>
            {/* 专辑 */}
            <div className='ellipsis flex-1'>{data.albums[index].name}</div>
            {/* 时长 */}
            <div style={{ width: 120 }}>{getTotalDuration(item.duration || 0)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MusicList
