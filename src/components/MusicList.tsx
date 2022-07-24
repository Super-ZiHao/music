import Icon from '@ant-design/icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface, getAlbum, setCurrentMusic } from '@/store/currentPlayMusicSlice'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { getTotalDuration } from '@/utils/function/time'
import { useDispatch, useSelector } from 'react-redux'
import { IconEmpty } from './Icons'
import { Empty, Spin } from 'antd'

const Loading = () => {}

type Props = {
  className?: string
  loading?: boolean
  data: SearchedMusicListInterface
}

const MusicList: React.FC<Props> = ({ className = '', loading = false, data }) => {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>((store) => store.currentPlayerMusic)
  const dispatch = useDispatch()
  if (loading) {
    return (
      <div className='flex items-center justify-center w-full h-full'>
        <Spin spinning size='large' tip='阿豪正在努力为您找寻歌曲😁' style={{ color: 'var(--color-white)' }} />
      </div>
    )
  }

  if (data.musics?.length > 0) {
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
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Empty description='请先搜索哟，现在还没有歌曲' image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: 'var(--color-white)' }} />
    </div>
  )
}

export default MusicList
