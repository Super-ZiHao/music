import { SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';

type Props = {
  className?: string
  placeholder?: string
  search?: boolean
  /**
   * 输入框内容
   */
  value?: string
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
  /**
   * 
   */
  onClear?: () => void
};

const Input: React.FC<Props> = (props) => {
  const { placeholder, className, value, search, onChange, onEnter, onFocus, onBlur, onToggle } = props
  const inputRef = useRef<HTMLInputElement>(null)
  
  // value改变触发事件
  const handleInput = (e: any) => {
    onChange?.(e.target.value)
    if (!!value) e.target.value = value
  }

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

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.value = value || ''
  }, [value])

  return (
    <div className='relative flex items-center'>
      <input
        ref={inputRef}
        className={`${className}`}
        type="text"
        placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleToggle}
        onFocus={handleToggle}
        style={{ paddingLeft: search ? '24px' : '' }}
      />
      {search && <SearchOutlined className='absolute' style={{ left: 8, color: 'var(--color-white)' }} />} 
    </div>
  )
};

export default Input;