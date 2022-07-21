import { useCallback, useEffect, useState } from 'react'

const useAudio = (className: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>(
    document.getElementsByClassName(className)[0] as HTMLAudioElement
  )
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
    setAudio(document.getElementsByClassName(className)[0] as HTMLAudioElement)
  }, [])

  useEffect(() => {
    if (!audio) return
    const handlePlay = () => {
      setDuration(audio.duration)
    }
    const handleTimeUpdate = () => {
      setCurrentDuration(audio.currentTime)
    }
    const play = () => setIsPlaying(true)
    const pause = () => setIsPlaying(false)
    audio.addEventListener('playing', play)
    audio.addEventListener('pause', pause)
    audio.addEventListener('canplay', handlePlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('playing', play)
      audio.removeEventListener('pause', pause)
      audio.removeEventListener('canplay', handlePlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  return { isPlaying, duration, currentDuration, audio, changeCurrentDuration, changeAudioToggle }
}

export default useAudio
