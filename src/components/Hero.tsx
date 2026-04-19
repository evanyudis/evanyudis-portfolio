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
        <div className="max-w-[640px]">

          {/* Name */}
          <h1 className="animate-in text-lg font-medium mb-3" style={{
            color: '#141414',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.01em'
          }}>
            Evan Yudistira
          </h1>

          {/* Role */}
          <p className="animate-in text-lg font-normal mb-4" style={{
            color: 'rgba(20,20,20,0.65)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Sr. Product Designer
          </p>

          {/* Intro tagline */}
          <p className="animate-in text-base mb-2 leading-relaxed" style={{
            color: 'rgba(20,20,20,0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Building design system before it was cool.
          </p>

          {/* Currently at */}
          <p className="animate-in text-base mb-8" style={{
            color: 'rgba(20,20,20,0.45)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}>
            Currently at{' '}
            <a
              href="https://www.kredivo.id"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-black transition-colors"
              style={{ color: '#141414' }}
            >
              Kredivo
            </a>
            {', '}
            previously at{' '}
            <span style={{ color: 'rgba(20,20,20,0.5)' }}>ByteDance, Tokopedia, and Astro</span>
          </p>

          {/* CTAs */}
          <div className="animate-in flex items-center gap-3 flex-wrap">
            <a href="#work">
              <Button variant="black">View Work</Button>
            </a>
            <a
              href="mailto:evanditoevan@gmail.com"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-pill border transition-all hover:border-[#525252]"
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
      </div>
    </section>
  )
}
