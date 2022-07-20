import { useCallback, useEffect, useState } from "react";

const useDebounce: (
  fn: Function,
  delay: number,
  dep?: any[]
) => [() => void, boolean] = (fn, delay, dep = []) => {
  const [state] = useState<{ fn: Function; timer: any }>({
    fn,
    timer: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    state.fn = fn;
  }, [fn]);

  return [
    useCallback(() => {
      setLoading(true);
      if (state.timer) {
        clearTimeout(state.timer);
      }
      state.timer = setTimeout(() => {
        state.fn();
        setLoading(false);
      }, delay);
    }, dep),
    loading,
  ];
};

export default useDebounce;
