'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="w-full py-5 px-6 fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        backgroundColor: scrolled ? 'rgba(250,250,250,0.97)' : 'rgba(250,250,250,0.6)',
        borderBottom: scrolled ? '1px solid #e5e5e5' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
          style={{ color: '#141414', fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
        >
          Evan
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
            style={{ color: '#737373', fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
            style={{ color: '#737373', fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
          >
            Experience
          </Link>
          <CopyEmailButton variant="nav" />
        </div>
      </div>
    </nav>
  )
}
