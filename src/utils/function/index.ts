import { MusicSource } from '@/types'

/**
 * 根据来源执行不同的 fn
 * @returns '网易云' | 'QQ‘
 */
export const musicSourceActuator: <T>(f1: () => T, f2: () => T) => T = (f1, f2) => {
  let musicSource: MusicSource = sessionStorage.getItem('MusicSource') as MusicSource
  if (!musicSource) {
    sessionStorage.setItem('MusicSource', '网易云')
    musicSource = '网易云'
  }
  switch (musicSource) {
    case '网易云':
      return f1()
    case 'QQ':
      return f2()
  }
}

/**
 * 获取音乐请求地址
 * @id 音乐id
 * @returns 音乐请求地址
 */
export const getMusicUrlString = (id: number) => {
  return musicSourceActuator(
    () => `https://music.163.com/song/media/outer/url?id=${id}.mp3`,
    () => ''
  )
}
