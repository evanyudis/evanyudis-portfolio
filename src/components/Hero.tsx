'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (containerRef.current) {
          gsap.set(containerRef.current.querySelectorAll('.animate-in'), { opacity: 1, y: 0 })
        }
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline()
        const children = containerRef.current?.querySelectorAll('.animate-in')
        if (!children || children.length === 0) return

        tl.fromTo(
          children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }
        )
        return () => {}
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="w-full min-h-[85vh] px-6 py-section"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Two-column grid: left content + right rail */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 lg:gap-16 items-start">

          {/* LEFT: Name, intro, CTAs — jaimec.co style */}
          <div className="flex flex-col items-start">
            {/* Name — H3 level (18px), matching jaimec.co */}
            <h3 className="animate-in text-lg font-medium mb-3" style={{ color: '#141414', fontFamily: 'var(--font-geist), system-ui, -apple-system, sans-serif' }}>
              Evan Yudistira
            </h3>

            {/* Intro — same H3 level, lighter weight */}
            <h3 className="animate-in text-lg font-normal mb-3" style={{ color: 'rgba(20,20,20,0.65)', fontFamily: 'var(--font-geist), system-ui, -apple-system, sans-serif' }}>
              Sr. Product Designer with 6+ years experience designing scalable products and design systems.
            </h3>

            {/* Currently at — inline text, no heading */}
            <p className="animate-in text-base mb-1" style={{ color: 'rgba(20,20,20,0.5)' }}>
              Currently designing at{' '}
              <a
                href="https://www.kredivo.id"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-black transition-colors"
                style={{ color: '#141414' }}
              >
                Kredivo
              </a>
            </p>

            <p className="animate-in text-base mb-8" style={{ color: 'rgba(20,20,20,0.45)' }}>
              Previously Tokopedia | TikTok Shop, AdMedika
            </p>

            {/* CTAs */}
            <div className="animate-in flex items-center gap-3 flex-wrap">
              <a href="#work">
                <Button variant="black">View Work</Button>
              </a>
              <a
                href="mailto:evanditoevan@gmail.com"
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-pill border transition-all hover:border-mid-gray"
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#e5e5e5',
                  color: '#262626',
                }}
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* RIGHT: Profile rail — minimal, matching Ollama aesthetic */}
          <div className="animate-in hidden lg:block">
            <div
              className="rounded-container border p-6"
              style={{ borderColor: '#e5e5e5', backgroundColor: '#ffffff' }}
            >
              {/* Profile label */}
              <p className="text-xs font-mono text-silver mb-4 tracking-wider uppercase">About</p>

              {/* Role */}
              <div className="mb-4">
                <p className="text-sm font-medium" style={{ color: '#262626' }}>Senior Product Designer</p>
                <p className="text-sm" style={{ color: '#737373' }}>Kredivo Group</p>
              </div>

              {/* Expertise areas */}
              <div className="mb-4">
                <p className="text-xs font-mono text-silver mb-2 tracking-wider uppercase">Expertise</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Design Systems', 'Product Design', 'E-commerce', 'Figma'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-pill"
                      style={{ backgroundColor: '#fafafa', color: '#525252', border: '1px solid #e5e5e5' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <p className="text-xs font-mono text-silver mb-1 tracking-wider uppercase">Location</p>
                <p className="text-sm" style={{ color: '#525252' }}>Jakarta, Indonesia</p>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <p className="text-xs font-mono text-silver mb-1 tracking-wider uppercase">Available</p>
                <p className="text-sm" style={{ color: '#525252' }}>Open to opportunities</p>
              </div>

              {/* Contact links */}
              <div className="pt-4 border-t" style={{ borderColor: '#e5e5e5' }}>
                <p className="text-xs font-mono text-silver mb-2 tracking-wider uppercase">Reach me at</p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href="mailto:evanditoevan@gmail.com"
                    className="text-sm hover:text-black transition-colors"
                    style={{ color: '#262626' }}
                  >
                    evanditoevan@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/evanyudistira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-black transition-colors"
                    style={{ color: '#262626' }}
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/evanyudistira"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-black transition-colors"
                    style={{ color: '#262626' }}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
