import { useCallback, useState } from 'react'

const useThrottle: <T extends Function>(fn: T, delay: number, dep?: any[]) => [T, boolean] = (fn, delay, dep = []) => {
  const [loading, setLoading] = useState<boolean>(false)
  let lamp = false
  const changeFun: any = (...arg: any[]) => {
    if (lamp) return
    lamp = true
    setLoading(true)
    fn(...arg)
    setTimeout(() => {
      lamp = false
      setLoading(false)
    }, delay)
  }
  return [useCallback<typeof fn>(changeFun, dep), loading]
}

export default useThrottle
