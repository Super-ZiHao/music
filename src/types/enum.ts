// 搜索 menu 类型
export enum SearchMenuKeys {
  /** 音乐 */
  MUSIC_MENU = 'music_menu',
  /** 专辑 */
  ALBUM_MENU = 'album_menu',
  /** 歌手 */
  SINGER_MENU = 'singer_menu',
  /** 歌单 */
  SONGSHEET_MENU = 'songSheet_menu'
}

/**
 * useAudio 监听对象
 */
export enum AudioListenerUpdate {
  TIME = 'time',
  VOLUME = 'volume',
  TIMEANDVOLUME = 'timeAndVolume',
  DATA = 'data',
  NONE = 'null'
}
