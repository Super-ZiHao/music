import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Content from './components/Content'
import Header from './components/Header'
import Menu from './components/Menu'
import MusicPlayer from './components/MusicPlayer'
import RouteView from './route'
import { StoreInterface } from './store'
import { MusicInterface } from './store/currentPlayMusicSlice'
import { getMusicUrl } from './utils/request/api'

function App() {
  const music = useSelector<StoreInterface, MusicInterface>((store) => store.music)
  return (
    <div className='App shell'>
      {/* 毛玻璃背景 */}
      <img
        className='fixed w-full h-full'
        style={{
          left: 0,
          top: 0,
          zIndex: -1,
          filter: 'blur(30px)'
        }}
        src={music.coverUrl}
        alt=''
      />
      <div className='flex' style={{ height: 'calc(100% - 68px)' }}>
        <Menu />
        <div className='flex-1 flex column pl-16 pr-16'>
          <Header />
          <BrowserRouter>
            <RouteView />
          </BrowserRouter>
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
  )
}

export default App
