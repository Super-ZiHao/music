import Icon, { HeartOutlined, PlusOutlined } from '@ant-design/icons'
import { StoreInterface } from '@/store'
import { CurrentPlayerMusicInterface, getAlbum, setCurrentMusic } from '@/store/currentPlayMusicSlice'
import { SearchedMusicListInterface } from '@/store/searchedMusicListSlice'
import { getTotalDuration } from '@/utils/function/time'
import { useDispatch, useSelector } from 'react-redux'
import { IconAdd, IconCollection2, IconDownLoad } from './Icons'
import { Empty, Spin } from 'antd'

const Loading = () => {}

type Props = {
  className?: string
  loading?: boolean
  data: SearchedMusicListInterface
}

const MusicList: React.FC<Props> = ({ className = '', loading = false, data }) => {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
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
        {data.musics.map((item, index) => (
          <div
            key={item.musicId}
            className={`flex items-center justify-between music-list-item`}
            onDoubleClick={() => {
              dispatch(setCurrentMusic(item))
              if (!(item.albumId === currentPlayerMusic.currentMusicAlbum.id)) dispatch(getAlbum(item.albumId) as any)
            }}
          >
            <div className='flex items-center'>
              {/* 排名 */}
              <div className='ranking-top' style={{ width: 50 }}>
                {index + 1}
              </div>
              {/* 音乐名称 */}
              <div className='' style={{ width: 200 }}>
                <div className='fs-18 lh-18 color-white-transparent ellipsis'>{item.musicName}</div>
                <div className='fs-12 lh-14 mt-6 color-gray-transparent ellipsis'>{item.singerName}</div>
              </div>
            </div>
            <div className='control items-center'>
              <Icon component={IconCollection2} className='cp color-white-transparent' style={{ width: 16, height: 16 }} />
              <HeartOutlined className='cp color-white-transparent' />
              <Icon component={IconAdd} className='cp color-white-transparent' style={{ width: 14, height: 14 }} />
              <Icon component={IconDownLoad} className='cp color-white-transparent' style={{ width: 14, height: 14 }} />
            </div>
            <div className='color-white-transparent' style={{ width: 100 }}>{ getTotalDuration(item.duration) }</div>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Empty description='请先搜索哟，现在还没有数据' image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ color: 'var(--color-white)' }} />
    </div>
  )
}

export default MusicList
