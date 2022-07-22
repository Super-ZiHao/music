import { useCallback, useEffect, useState } from 'react'

const useAudio = (listenerTimeUpdate = false, audioClassName = 'music-player') => {
  const [audio, setAudio] = useState<HTMLAudioElement>(document.getElementsByClassName(audioClassName)[0] as HTMLAudioElement)
  const [isPlaying, setIsPlaying] = useState<boolean>(false) // 是否播放
  const [duration, setDuration] = useState<number>(0) // 总时长
  const [currentDuration, setCurrentDuration] = useState<number>(0) // 当前时长
  // 设置进度条
  const changeCurrentDuration = useCallback(
    (num: number, isPlay = true) => {
      isPlay && audio.play()
      audio.currentTime = num
    },
    [audio]
  )

  // 播放开关
  const changeAudioToggle = useCallback(() => {
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [audio])

  useEffect(() => {
    if (audio) return
    setAudio(document.getElementsByClassName(audioClassName)[0] as HTMLAudioElement)
  }, [])

  useEffect(() => {
    if (!audio) return
    const play = () => setIsPlaying(true)
    const pause = () => setIsPlaying(false)
    const handlePlay = () => setDuration(audio.duration)
    audio.addEventListener('playing', play) // 开始播放事件
    audio.addEventListener('pause', pause) // 停止播放时间
    audio.addEventListener('canplay', handlePlay) // 可以播放事件
    return () => {
      audio.removeEventListener('playing', play)
      audio.removeEventListener('pause', pause)
      audio.removeEventListener('canplay', handlePlay)
    }
  }, [audio])

  // 是否需要监听音乐时间的变化
  useEffect(() => {
    if (!listenerTimeUpdate || !audio) return
    const handleTimeUpdate = () => setCurrentDuration(audio.currentTime)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  return { isPlaying, duration, currentDuration, audio, changeCurrentDuration, changeAudioToggle }
}

export default useAudio
