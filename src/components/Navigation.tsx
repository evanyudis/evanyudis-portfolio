import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="w-full py-6 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-normal text-black no-underline hover:text-stone transition-colors"
        >
          Evan Yudistira
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="text-base font-normal text-black no-underline hover:text-stone transition-colors"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="text-base font-normal text-black no-underline hover:text-stone transition-colors"
          >
            Experience
          </Link>
          <a
            href="mailto:evanditoevan@gmail.com"
            className="text-base font-normal text-black no-underline hover:text-stone transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
