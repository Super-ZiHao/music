import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Menu from './components/Menu'
import MusicPlayer from './components/MusicPlayer'
import RouteView from './route'
import { StoreInterface } from './store'
import { MusicInterface } from './store/currentPlayMusicSlice'

function App() {
  const dispatch = useDispatch()
  const music = useSelector<StoreInterface, MusicInterface>((store) => store.currentPlayerMusic)
  const musicList = useSelector<StoreInterface, MusicInterface[]>((store) => store.searchedMusicList)
  return (
    // @ts-ignore
    <div className='App shell'>
      <div className='h-full' style={{ backdropFilter: 'blur(50px)' }}>
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
    </div>
  )
}

export default App
