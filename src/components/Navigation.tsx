import Link from 'next/link'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'

export function Navigation() {
  return (
    <nav className="w-full py-5 px-6 fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(250,250,250,0.95)' }}>
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
          style={{ color: '#141414' }}
        >
          Evan
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
            style={{ color: '#737373' }}
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="text-sm font-medium no-underline transition-colors hover:text-[#525252]"
            style={{ color: '#737373' }}
          >
            Experience
          </Link>
          <CopyEmailButton variant="nav" />
        </div>
      </div>
    </nav>
  )
}
