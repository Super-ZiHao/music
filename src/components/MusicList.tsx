import Icon from '@ant-design/icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface, getAlbum, setCurrentMusic } from '@/store/currentPlayMusicSlice'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { getTotalDuration } from '@/utils/function/time'
import { useDispatch, useSelector } from 'react-redux'
import { IconEmpty } from './Icons'

const Loading = () => {}

type Props = {
  className?: string
  loading?: boolean
  data: SearchedMusicListInterface
}

const MusicList: React.FC<Props> = (props) => {
  const { className = '', loading = false, data } = props
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>((store) => store.currentPlayerMusic)
  if (loading) {
    return <div>正在查询歌曲</div>
  }
  if (!(data.musics.length > 0)) {
    return (
      <div className='flex items-center justify-center column w-full h-full'>
        <Icon component={IconEmpty} style={{ width: '30%', marginTop: -32 }} />
        <div className='fs-24 color-white'>请先搜索歌曲</div>
      </div>
    )
  }
  const dispatch = useDispatch()
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
              if (!(item.albumId === currentPlayerMusic.currentMusicAlbum.id)) dispatch(getAlbum(item.albumId) as any)
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
