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
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
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
            className="w-[96px] text-center px-3 py-1.5 text-sm font-normal no-underline rounded-full transition-all duration-150 hover:bg-black/5 active:scale-95"
            style={{ color: pathname === '/' ? '#141414' : '#737373' }}
          >
            Index
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="w-[96px] text-center px-3 py-1.5 text-sm font-normal no-underline rounded-full transition-all duration-150 hover:bg-black/5 active:scale-95"
            style={{ color: pathname === '/about' ? '#141414' : '#737373' }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}
