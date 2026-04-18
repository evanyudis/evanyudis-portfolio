import React from 'react'

interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-xs font-normal
        bg-light-gray text-near-black
        rounded-pill
        ${className}
      `}
    >
      {children}
    </span>
  )
}
