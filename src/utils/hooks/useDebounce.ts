import { useCallback, useState } from 'react'

const useDebounce: <T extends Function>(fn: T, delay: number, dep?: any[]) => [T, boolean] = (fn, delay, dep = []) => {
  type T = typeof fn;
  const [state] = useState<{fn: T, timer: any}>({
    fn,
    timer: null
  })
  const [loading, setLoading] = useState<boolean>(false)

  const changeFun: any = (...arg: any[]) => {
    setLoading(true)
    if (state.timer) {
      clearTimeout(state.timer)
    }
    state.timer = setTimeout(() => {
      state.fn(...arg)
      setLoading(false)
    }, delay)
  }

  return [
    useCallback<T>(changeFun, dep),
    loading
  ]
}

export default useDebounce
