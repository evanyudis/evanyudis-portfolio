import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  href?: string
}

export function Card({ children, className = '', href }: CardProps) {
  const base = `
    block
    bg-white border border-light-gray rounded-container
    p-6 md:p-8
    no-underline
    transition-colors duration-150
  `

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    )
  }

  return <div className={`${base} ${className}`}>{children}</div>
}
