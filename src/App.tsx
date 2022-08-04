import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import MusicPlayer from './components/MusicPlayer'
import RouteView from './route'
import { StoreInterface } from './store'
import { CurrentPlayerMusicInterface } from './store/currentPlayMusicSlice'
import useAudio from './utils/hooks/useAudio'

function App() {
  const currentPlayerMusic = useSelector<StoreInterface, CurrentPlayerMusicInterface>(store => store.currentPlayerMusic)
  // 实现音频可视化
  useEffect(() => {
    onLoadAudio()
  }, [])
  const onLoadAudio = () => {
    const context = new AudioContext() // 音频上下文
    const analyser = context.createAnalyser() // 分析器
    analyser.fftSize = 256 // 设置数据长度
    const source = context.createMediaElementSource(document.querySelector('#audio') as HTMLMediaElement) // 获取音频

    source.connect(analyser) 
    analyser.connect(context.destination) 

    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)


    const canvas = document.getElementById('canvas') as any
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext('2d')
    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = (WIDTH / bufferLength) * 1.5
    let barHeight
    const render =  () => {
      analyser.getByteFrequencyData(dataArray)
      ctx.clearRect(0, 0, WIDTH, HEIGHT)

      // 拿到数据画图
      for (var i = 0, x = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]
        var r = barHeight + 25 * (i / bufferLength)
        var g = 255 * (i / bufferLength)
        var b = 10

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 2
      }
    }

    // 重复执行，获取最新音频
    setInterval(() => {
      render()
    }, 10)
  }
  return (
    // @ts-ignore
    <div className='App shell relative'>
      {/* 背景 */}
      <img className='absolute w-full h-full' src={currentPlayerMusic.currentMusicAlbum.url} alt='' />
      {/* 音乐 */}
      <audio id="audio" className='music-player' src={currentPlayerMusic.currentMusic.musicUrl} crossOrigin="anonymous" />
      {/* 音频可视化 */}
      <div className='h-full' style={{ backdropFilter: 'blur(32px)', backgroundColor: 'rgba(0,0,0, 0.3)' }}>
        {/* 可视化音频 */}
        <canvas id='canvas' className='fixed' style={{ left: 0, bottom: 0, zIndex: -1, opacity: 0.3 }} />
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
          />
        </div>
      </div>
    </div>
  )
}

export default App
