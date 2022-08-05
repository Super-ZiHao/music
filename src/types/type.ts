export type MusicType = {
  musicName: string // 音乐名称
  musicId: number // 音乐 id
  musicUrl: string // 音乐地址
  singerName: string // 歌手名称
  coverUrl: string // 封面地址
  albumId: number // 专辑 id
  duration: number // 歌曲的总时长
  lyric: { time: number; text: string }[] // 歌词
  [any: string]: any
}

export type AlbumType = {
  id: number // 专辑 id
  name: string // 专辑名称
  url: string // 专辑封面
}

export type RankingListType = {
  id: number // 排行榜id
  name: string // 排行榜名称
  desc: string // 排行榜描述
  updateFrequency: string // 排行榜更新频率
  updateTime: number // 排行榜最近更新时间
}
