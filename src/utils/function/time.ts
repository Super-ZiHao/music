// 格式化时间
export const getTotalDuration = (time: number) => {
  const date = new Date(time)
  // 处理秒
  const second: string = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`
  // 处理分
  const minute = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`
  return `${minute}:${second}`
}
