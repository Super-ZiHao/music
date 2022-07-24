export type MusicType = {
  musicName: string // 音乐名称
  musicId: number // 音乐 id
  singerName: string // 歌手名称
  coverUrl: string // 封面地址
  albumId: string // 专辑 id
  duration: number // 歌曲的总时长
  [any: string]: any
}
