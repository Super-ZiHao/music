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
  NONE = 'null'
}

/**
 * 音乐播放模式
 */
export enum MusicPlayerModel {
  XINDON = '心动模式',
  SHUNXU = '顺序模式',
  DANQU = '单曲循环模式',
  SUIJI = '随机模式',
  LIEBIAO = '列表循环',
}