import { useSelector } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import MusicPlayer from './components/MusicPlayer'
import RouteView from './route'
import { StoreInterface } from './store'
import { CurrentPlayerMusicInterface } from './store/currentPlayMusicSlice'

function App() {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
  return (
    // @ts-ignore
    <div className='App shell relative'>
      <img className='absolute w-full h-full' src={currentPlayerMusic.currentMusicAlbum.url} alt='' />
      <div className='h-full' style={{ backdropFilter: 'blur(32px)', backgroundColor: 'rgba(0,0,0, 0.3)' }}>
        <div className='flex' style={{ height: 'calc(100% - 68px)' }}>
          <Menu />
          <div className='flex-1 flex column pl-16 pr-16'>
            <Header />
            <RouteView />
          </div>
        </div>
        {/* 播放器 */}
        <div className='w-full' style={{ height: 68 }}>
          <MusicPlayer
          // 数据
          // 点击上一首
          // 点击下一首
          // 下载
          />
        </div>
      </div>
    </div>
  )
}

export default App
