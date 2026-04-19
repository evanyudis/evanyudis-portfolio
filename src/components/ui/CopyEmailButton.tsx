'use client'

import { useState, useRef } from 'react'

interface CopyEmailButtonProps {
  variant?: 'nav' | 'hero'
  email?: string
  className?: string
}

export function CopyEmailButton({
  variant = 'hero',
  email = 'evanditoevan@gmail.com',
  className = '',
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback: create textarea
      const textarea = document.createElement('textarea')
      textarea.value = email
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 3000)
    }
  }

  if (variant === 'nav') {
    return (
      <button
        onClick={handleCopy}
        className={`
          inline-flex items-center justify-center gap-1.5
          px-4 py-1.5 text-sm font-medium rounded-pill
          transition-all duration-150 ease-out
          ${copied
            ? 'bg-[#141414] text-white border border-[#141414]'
            : 'bg-[#141414] text-white border border-[#141414] hover:bg-[#262626]'
          }
          active:scale-[0.97]
          ${className}
        `}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied
          </>
        ) : (
          'Reach Out'
        )}
      </button>
    )
  }

  // hero variant
  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center justify-center gap-2
        px-6 py-2.5 text-sm font-medium rounded-pill
        transition-all duration-150 ease-out
        ${copied
          ? 'bg-[#141414] text-white border border-[#141414]'
          : 'bg-black text-white border border-black hover:bg-[#262626]'
        }
        active:scale-[0.97]
        ${className}
      `}
      style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied
        </>
      ) : (
        'Reach Out'
      )}
    </button>
  )
}
