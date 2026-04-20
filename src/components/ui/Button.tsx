'use client'

import React from 'react'

type ButtonVariant = 'black' | 'gray' | 'white'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
}

const variantClasses = {
  black: 'bg-black text-white border border-black hover:bg-near-black',
  gray: 'bg-light-gray text-near-black border border-light-gray hover:bg-border-light',
  white: 'bg-white text-button-dark border border-border-light hover:bg-snow',
}

export function Button({
  variant = 'gray',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-btn py-btn
        text-base
        rounded-pill
        transition-[background-color,color,border-color] duration-160 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${variantClasses[variant]}
        ${className}
      `}
      style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
      {...props}
    >
      {children}
    </button>
  )
}
