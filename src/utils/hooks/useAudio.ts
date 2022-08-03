import { useCallback, useEffect, useRef, useState } from 'react'
import { AudioListenerUpdate } from '@/types/enum'

/**
 * @param listenerTimeUpdate 是否监听时间  default —— false
 * @param listenerVolumeUpdate 是否监听音量 default —— false
 * @param audioClassName 播放器的类名 default —— music-player
 */
const useAudio = (audioListenerUpdate = AudioListenerUpdate.NONE, audioClassName = 'music-player') => {
  const [audio, setAudio] = useState<HTMLAudioElement>(document.getElementsByClassName(audioClassName)[0] as HTMLAudioElement)
  const [isPlaying, setIsPlaying] = useState<boolean>(!audio?.paused) // 是否播放
  const [duration, setDuration] = useState<number>(0) // 总时长
  const [currentDuration, setCurrentDuration] = useState<number>(0) // 当前时长
  const [muted, setMuted] = useState<boolean>(false) // 是否静音
  const [volume, setVolume] = useState<number>(100)
  // 设置进度条
  const changeCurrentDuration = useCallback(
    (num: number, isPlay = false) => {
      isPlay && audio.play()
      audio.currentTime = num
    },
    [audio]
  )

  // 播放开关
  const changeAudioToggle = useCallback(() => {
    if (audio.error) return // 说明资源还未被加载
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [audio])

  // 静音开关
  const changeAudioMuted = useCallback(() => {
    if (audio.muted) {
      audio.volume = Number(sessionStorage.getItem('volume'))
      setVolume(Number(sessionStorage.getItem('volume')) * 100)
    } else {
      sessionStorage.setItem('volume', String(audio.volume))
      audio.volume = 0
      setVolume(0)
    }
    audio.muted = !audio.muted
    setMuted(!audio.muted)
  }, [audio])

  // 设置音量
  const changeAudioVolume = useCallback(
    (num: number) => {
      audio.volume = num / 100
      setVolume(audio?.volume * 100)
    },
    [audio]
  )

  useEffect(() => {
    if (audio) return
    setAudio(document.getElementsByClassName(audioClassName)[0] as HTMLAudioElement)
  }, [])

  useEffect(() => {
    if (!audio) return
    const play = () => setIsPlaying(true)
    const pause = () => setIsPlaying(false)
    const handlePlay = () => {
      setDuration(audio.duration)
      if (audio.currentTime > 0) return
      audio.play()
    }

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
    if (audioListenerUpdate !== AudioListenerUpdate.TIME || !audio) return
    const handleTimeUpdate = () => setCurrentDuration(audio.currentTime)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  // 是否需要监听音乐音量的变化
  useEffect(() => {
    if (audioListenerUpdate !== AudioListenerUpdate.VOLUME || !audio) return
    const handleVolumeChange = () => {
      if (audio?.volume <= 0) {
        setMuted(true)
        audio.muted = true
      } else {
        setMuted(false)
        audio.muted = false
      }
    }
    audio.addEventListener('volumechange', handleVolumeChange) // 音量改变触发
    return () => {
      audio.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [audio])

  return {
    isPlaying,
    duration,
    currentDuration,
    muted,
    volume,
    audio,
    changeCurrentDuration,
    changeAudioToggle,
    changeAudioMuted,
    changeAudioVolume
  }
}

export default useAudio
