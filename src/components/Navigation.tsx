import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="w-full py-5 px-6 md:px-12 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center">
        {/* Frosted pill centered nav */}
        <div
          className="inline-flex items-center gap-1 px-3 py-2 rounded-pill"
          style={{
            backgroundColor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(229,229,229,0.5)',
          }}
        >
          <Link
            href="/"
            className="px-4 py-1.5 text-sm font-medium rounded-pill no-underline transition-colors hover:bg-light-gray"
            style={{ color: '#141414' }}
          >
            Evan
          </Link>
          <span className="text-light-gray">|</span>
          <Link
            href="/#work"
            className="px-4 py-1.5 text-sm font-medium rounded-pill no-underline transition-colors hover:bg-light-gray"
            style={{ color: '#525252' }}
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="px-4 py-1.5 text-sm font-medium rounded-pill no-underline transition-colors hover:bg-light-gray"
            style={{ color: '#525252' }}
          >
            Experience
          </Link>
          <Link
            href="/#toolkit"
            className="px-4 py-1.5 text-sm font-medium rounded-pill no-underline transition-colors hover:bg-light-gray"
            style={{ color: '#525252' }}
          >
            Toolkit
          </Link>
          <Link
            href="mailto:evanditoevan@gmail.com"
            className="px-4 py-1.5 text-sm font-medium rounded-pill no-underline transition-colors hover:bg-light-gray"
            style={{ color: '#525252' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}