import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  className?: string
  placeholder?: string
  height?: string | number
  search?: boolean
  /** 搜索展示框 className */
  searchBoxClassName?: string
  /** 自定义展示框 */
  searchBoxComponent?: React.ReactNode
  /** 是否显示展示框 */
  showSearchBox?: boolean
  /** 输入框内容 */
  value?: string
  /** value改变触发 — (value: string) => void */
  onChange?: (value: string) => void
  /** 回车事件 — (value) => void */
  onEnter?: (value: string) => void
  /** 聚焦事件 — (value) => void */
  onFocus?: (value: string) => void
  /** 失焦事件 — (value) => void */
  onBlur?: (value: string) => void
  /** 聚焦和失焦都会触发 — (value，eventName) => void */
  onToggle?: (value: string, name?: string) => void
  /** 清除事件 */
  onClear?: () => void
}

const Input: React.FC<Props> = ({
  placeholder,
  className = '',
  height = 32,
  value,
  searchBoxClassName = '',
  searchBoxComponent,
  search = false,
  onChange,
  onEnter,
  onFocus,
  onBlur,
  onToggle
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const searchDisplayBoxRef = useRef<HTMLDivElement>(null)
  const [showSearchBox, setShowSearchBox] = useState<boolean>(false)

  // value改变触发事件
  const handleInput = (e: any) => {
    onChange?.(e.target.value)
  }

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.value = value as string
  }, [value])

  // 回车事件
  const handleKeyDown = (e: any) => {
    if (!onEnter) return
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      setTimeout(() => {
        onEnter((inputRef.current as HTMLInputElement).value)
      }, 0)
    }
  }

  // 切换事件
  const handleToggle = (e: any) => {
    if (e._reactName === 'onFocus') {
      onFocus?.(e.target.value)
      search && setShowSearchBox(true)
    }
    if (e._reactName === 'onBlur') {
      onBlur?.(e.target.value)
      if (search) {
        setTimeout(() => {
          setShowSearchBox(false)
        }, 150)
      }
    }
    if (onToggle) onToggle(e.target.value, e._reactName === 'onFocus' ? 'focus' : 'blur')
  }

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.value = value || ''
  }, [value])

  return (
    <div className='relative flex items-center' style={{ zIndex: 10 }}>
      {search && (
        <>
          {/* 搜索的 icon */}
          <SearchOutlined
            className='absolute color-white'
            style={{ left: 8, color: 'var(--color-white)' }}
            onClick={() => onEnter?.(inputRef.current?.value || '')}
          />
          {/* 搜索提示框 */}
          {searchBoxComponent && showSearchBox && (
            <div
              ref={searchDisplayBoxRef}
              className={`absolute ${searchBoxClassName}`}
              style={{
                left: 0,
                top: `calc(${typeof height === 'string' ? height : height + 'px'} + 10px)`
              }}
            >
              {searchBoxComponent}
            </div>
          )}
        </>
      )}
      <input
        ref={inputRef}
        className={`${className}`}
        type='text'
        placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onBlur={handleToggle}
        onFocus={handleToggle}
        style={{ paddingLeft: search ? '24px' : '', height }}
        onDoubleClick={e => e.stopPropagation()} // 阻止事件穿透
      />
    </div>
  )
}

export default Input
