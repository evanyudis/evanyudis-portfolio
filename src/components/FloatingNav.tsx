'use client'

import Link from 'next/link'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'

export function FloatingNav() {
  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 pointer-events-none">
      <div
        className="max-w-screen-xl mx-auto pointer-events-auto"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '9999px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        }}
      >
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left: Logo/Name */}
          <Link
            href="/"
            className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
            style={{ color: '#141414' }}
          >
            Evan
          </Link>

          {/* Center: Nav Links */}
          <div className="flex items-center gap-1">
            <Link
              href="/#work"
              className="px-4 py-1.5 text-sm font-medium no-underline transition-colors rounded-pill hover:bg-black/5"
              style={{ color: '#737373' }}
            >
              Work
            </Link>
            <Link
              href="/#experience"
              className="px-4 py-1.5 text-sm font-medium no-underline transition-colors rounded-pill hover:bg-black/5"
              style={{ color: '#737373' }}
            >
              Experience
            </Link>
            <Link
              href="/about"
              className="px-4 py-1.5 text-sm font-medium no-underline transition-colors rounded-pill hover:bg-black/5"
              style={{ color: '#737373' }}
            >
              About
            </Link>
          </div>

          {/* Right: Reach Out CTA */}
          <CopyEmailButton variant="nav" />
        </div>
      </div>
    </nav>
  )
}
