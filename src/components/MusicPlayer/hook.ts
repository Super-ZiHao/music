import { useCallback, useEffect, useState } from 'react'

export const useAudio = (className: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>(
    document.getElementsByClassName(className)[0] as HTMLAudioElement
  )
  const [duration, setDuration] = useState<number>(0) // 总时长
  const [currentDuration, setCurrentDuration] = useState<number>(0) // 当前时长

  const changeCurrentDuration = useCallback(
    (num: number, isPlay = true) => {
      isPlay && audio.play()
      audio.currentTime = num
    },
    [audio]
  )

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
    audio.addEventListener('canplay', handlePlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    return () => {
      audio.removeEventListener('canplay', handlePlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio])

  return { duration, currentDuration, audio, changeCurrentDuration }
}
