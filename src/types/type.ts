export type MusicType = {
  musicName: string // 音乐名称
  musicId: number // 音乐 id
  singerName: string // 歌手名称
  coverUrl: string // 封面地址
  albumId: number // 专辑 id
  duration: number // 歌曲的总时长
  lyric: any // 歌词
  [any: string]: any
}

export type AlbumType = {
  id: number // 专辑 id
  name: string // 专辑名称
  url: string // 专辑封面
}
