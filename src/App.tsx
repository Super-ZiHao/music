import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import Header from './components/Header'
import Menu from './components/Menu'
import MusicPlayer from './components/MusicPlayer'
import RouteView from './route'
import { StoreInterface } from './store'
import { CurrentPlayerMusicInterface } from './store/currentPlayMusicSlice'

function App() {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>((store) => store.currentPlayerMusic)
  // const [oldUrl, setOldUrl] = useState<string>('')
  // useEffect(() => {
  //   const value = currentPlayerMusic.currentMusicAlbum.url
  //   return () => {
  //     setOldUrl(value)
  //   }
  // }, [])
  return (
    // @ts-ignore
    <div className='App shell relative'>
      {/* <img className='absolute w-full h-full' src={oldUrl} alt='' /> */}
      <img className='absolute w-full h-full' src={currentPlayerMusic.currentMusicAlbum.url} alt='' />
      <div className='h-full' style={{ backdropFilter: 'blur(32px)', backgroundColor: 'rgba(0,0,0, 0.35)' }}>
        <div className='flex' style={{ height: 'calc(100% - 68px)' }}>
          <Menu />
          <div className='flex-1 flex column pl-16 pr-16'>
            <Header />
            <HashRouter>
              <RouteView />
            </HashRouter>
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
