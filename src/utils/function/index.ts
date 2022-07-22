import { MusicType } from '@/types'

/**
 * 获取音乐来源
 * @returns '网易云' | 'QQ‘
 */
export const getMusicSourceType: () => MusicType = () => {
  let musicType: MusicType = sessionStorage.getItem('musicType') as MusicType
  if (!musicType) {
    sessionStorage.setItem('musicType', '网易云')
    musicType = '网易云'
  }
  return musicType
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
