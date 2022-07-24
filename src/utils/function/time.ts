/**
 * @param time 时间戳
 * @returns
 */
export const getTotalDuration = (time: number) => {
  const date = new Date(time)
  // 处理分
  const minute = date.getMinutes()
  // 处理秒
  const second: string = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`
  return `${minute}:${second}`
}

/**
 *
 * @param time 秒数
 * @returns
 */
export const getTotalDuration2 = (time: number) => {
  // 处理分
  const minute = Math.floor((time / 60) % 60)
  // 处理秒
  const second = Math.floor(time % 60) > 9 ? Math.floor(time % 60) : `0${Math.floor(time % 60)}`
  return `${minute}:${second}`
}
