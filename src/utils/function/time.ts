import * as dayjs from 'dayjs'

// 格式化时间
export const getTotalDuration = (time: number) => {
  const date = dayjs(time)
  // 处理秒
  const second: string = date.second() > 9 ? `${date.second()}` : `0${date.second()}`
  // 处理分
  const minute = date.minute() > 9 ? `${date.minute()}` : `0${date.minute()}`
  return `${minute}:${second}`
}
