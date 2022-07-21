import { useCallback, useState } from 'react'

const useDebounce: (fn: Function, delay: number, dep?: any[]) => [any, boolean] = (fn, delay, dep = []) => {
  const [state] = useState<{ fn: Function; timer: any }>({
    fn,
    timer: null
  })
  const [loading, setLoading] = useState<boolean>(false)

  return [
    useCallback((...n: any[]) => {
      setLoading(true)
      if (state.timer) {
        clearTimeout(state.timer)
      }
      state.timer = setTimeout(() => {
        state.fn(...n)
        setLoading(false)
      }, delay)
    }, dep),
    loading
  ]
}

export default useDebounce
