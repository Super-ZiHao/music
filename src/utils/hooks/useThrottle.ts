import { useCallback } from 'react'

const useThrottle: <T extends Function>(fn: T, delay: number, dep?: any[]) => T = (fn, delay, dep = []) => {
  let lamp = false
  const changeFun: any = (...arg: any[]) => {
    if (lamp) return
    lamp = true
    fn(...arg)
    setTimeout(() => {
      lamp = false
    }, delay)
  }
  return useCallback<typeof fn>(changeFun, dep)
}

export default useThrottle
