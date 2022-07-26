import { useCallback, useState } from 'react'

const useDebounce: <T extends Function>(fn: T, delay: number, dep?: any[]) => T = (fn, delay, dep = []) => {
  type T = typeof fn
  const [state] = useState<{ fn: T; timer: any }>({
    fn,
    timer: null
  })

  const changeFun: any = (...arg: any[]) => {
    if (state.timer) {
      clearTimeout(state.timer)
    }
    state.timer = setTimeout(() => {
      state.fn(...arg)
    }, delay)
  }

  return useCallback<T>(changeFun, dep)
}

export default useDebounce
