'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function FloatingNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto rounded-full"
        style={{
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          backgroundColor: 'rgba(255, 255, 255, 0.20)',
          border: '1px solid rgba(255, 255, 255, 0.30)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.60),
            0 8px 32px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04)
          `,
          padding: '4px',
        }}
      >
        <div
          className="flex items-center gap-1"
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {/* Index */}
          <Link
            href="/"
            className="w-[96px] text-center px-3 py-1.5 text-sm font-normal no-underline rounded-full transition-all duration-150 hover:bg-white/10 active:scale-95"
            style={{ color: pathname === '/' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.60)' }}
          >
            Index
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="w-[96px] text-center px-3 py-1.5 text-sm font-normal no-underline rounded-full transition-all duration-150 hover:bg-white/10 active:scale-95"
            style={{ color: pathname === '/about' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.60)' }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
