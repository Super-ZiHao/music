import {http} from './http'
// 搜索歌曲
export const getMusic: (name: string) => any = (name) => http.get(`search?keywords=${name}&realIP=116.25.146.177`).then(res => res.result)

// 歌曲 MP3
export const getMusicUrl: (id: number) => string = (id) => `https://music.163.com/song/media/outer/url?id=${id}.mp3`