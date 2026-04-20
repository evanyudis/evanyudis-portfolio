'use client'

import Link from 'next/link'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'

export function FloatingNav() {
  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div
        className="pointer-events-auto flex items-center rounded-full"
        style={{
          backdropFilter: 'blur(24px) saturate(200%)',
          WebkitBackdropFilter: 'blur(24px) saturate(200%)',
          backgroundColor: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
          padding: '4px',
        }}
      >
        <div
          className="flex items-center"
          style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}
        >
          {/* Index */}
          <Link
            href="/"
            className="flex-1 min-w-0 text-center px-3 py-1.5 text-sm font-medium no-underline rounded-full transition-all duration-150 hover:bg-black/5 active:scale-95"
            style={{ color: '#737373' }}
          >
            Index
          </Link>

          {/* About */}
          <Link
            href="/about"
            className="flex-1 min-w-0 text-center px-3 py-1.5 text-sm font-medium no-underline rounded-full transition-all duration-150 hover:bg-black/5 active:scale-95"
            style={{ color: '#737373' }}
          >
            About
          </Link>

          {/* Reach Out */}
          <div className="flex-1 min-w-0">
            <CopyEmailButton variant="nav" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </nav>
  )
}
