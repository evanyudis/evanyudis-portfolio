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
          <h1 className="animate-in mb-2" style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.2'
          }}>
            Evan Yudistira
          </h1>

          {/* Intro tagline */}
          <p className="animate-in mb-4" style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 450,
            color: '#737373',
            letterSpacing: '0px',
            lineHeight: '1.4'
          }}>
            7+ years designing product across industries, currently at{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/kredivo.png"
                alt="Kredivo"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://www.kredivo.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 500 }}
              >
                Kredivo
              </a>
            </span>
            , previously at{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/bytedance.png"
                alt="ByteDance"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://www.bytedance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 500 }}
              >
                Bytedance
              </a>
            </span>
            ,{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/tokopedia.png"
                alt="Tokopedia"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://www.tokopedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 500 }}
              >
                Tokopedia
              </a>
            </span>
            , and{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/astronauts.png"
                alt="Astronauts"
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <a
                href="https://www.astronauts.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 500 }}
              >
                Astronauts
              </a>
            </span>
          </p>

          {/* CTAs */}
          <div className="animate-in flex items-center gap-3 flex-wrap">
            <a href="#work">
              <Button variant="black" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>View Work</Button>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText('evanditoevan@gmail.com')
              }}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-pill border transition-all hover:border-[#525252]"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#e5e5e5',
                color: '#262626',
                fontFamily: 'var(--font-geist), system-ui, sans-serif'
              }}
            >
              Reach Out
            </button>
            <a href="/about">
              <Button variant="white" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>About</Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
