import React, { useRef } from 'react';

type Props = {
  className?: string
  placeholder?: string
  /**
   * value改变触发 — (value: string) => void
   */
  onChange?: (value: string) => void
  /**
   * 回车事件 — (value) => void
   */
  onEnter?: (value: string) => void
  /**
   * 聚焦事件 — (value) => void
   */
  onFocus?: (value: string) => void
  /**
   * 失焦事件 — (value) => void
   */
  onBlur?: (value: string) => void
  /**
   * 聚焦和失焦都会触发 — (value，eventName) => void
   */
  onToggle?: (value: string, name?: string) => void
};

const Input: React.FC<Props> = (props) => {
  const { placeholder, className, onChange, onEnter, onFocus, onBlur, onToggle } = props
  const inputRef = useRef<HTMLInputElement>(null)

  // 回车事件
  const handleKeyDown = (e: any) => {
    if (!onEnter) return
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      setTimeout(() => {
        onEnter((inputRef.current as HTMLInputElement).value)
      }, 0);
    }
  }

  // 切换事件
  const handleToggle = (e: any) => {
    if (e._reactName === 'onFocus' && onFocus) onFocus(e.target.value)
    if (e._reactName === 'onBlur' && onBlur) onBlur(e.target.value)
    if (onToggle) onToggle(e.target.value, e._reactName === 'onFocus' ? 'focus' : 'blur')
  }

  return <input
    ref={inputRef}
    className={`${className}`}
    type="text"
    placeholder={placeholder}
    onInput={(e: any) => onChange?.(e.target.value)}
    onKeyDown={handleKeyDown}
    onBlur={handleToggle}
    onFocus={handleToggle}
 />
};

export default Input;