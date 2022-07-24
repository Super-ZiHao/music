import { MusicSource } from '@/types'

/**
 * 获取音乐来源
 * @returns '网易云' | 'QQ‘
 */
export const getMusicSourceType: () => MusicSource = () => {
  let musicSource: MusicSource = sessionStorage.getItem('MusicSource') as MusicSource
  if (!musicSource) {
    sessionStorage.setItem('MusicSource', '网易云')
    musicSource = '网易云'
  }
  return musicSource
}

/**
 * 获取音乐请求地址
 * @id 音乐id
 * @returns 音乐请求地址
 */
export const getMusicUrlString = (id: number) => {
  const scource = getMusicSourceType()
  switch (scource) {
    case '网易云': {
      return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    }
    case 'QQ': {
    }
  }
}
