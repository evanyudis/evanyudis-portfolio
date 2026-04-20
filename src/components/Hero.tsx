'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'

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
        <div className="max-w-[640px] mx-auto text-center md:text-left hero-content">

          {/* Name */}
          <h1 className="animate-in hero-name mb-4" style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.4'
          }}>
            Evan Yudistira
          </h1>

          {/* Intro tagline */}
          <p className="animate-in hero-description mb-4 leading-relaxed" style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#737373',
            letterSpacing: '0px',
            lineHeight: '1.4'
          }}>
            7+ years designing product across industries, currently at{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/kredivo.png"
                alt="Kredivo"
                className="inline-block w-auto h-[1em]"
              />
              <a
                href="https://www.kredivo.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 400 }}
              >
                Kredivo
              </a>
            </span>
            , previously at{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/bytedance.svg"
                alt="Bytedance"
                className="inline-block w-auto h-[1em]"
              />
              <a
                href="https://www.bytedance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 400 }}
              >
                Bytedance
              </a>
            </span>
            ,{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/tokopedia.png"
                alt="Tokopedia"
                className="inline-block w-auto h-[1em]"
              />
              <a
                href="https://www.tokopedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 400 }}
              >
                Tokopedia
              </a>
            </span>
            , and{' '}
            <span className="hero-company-item">
              <img
                src="/company-logos/astronauts.png"
                alt="Astronauts"
                className="inline-block w-auto h-[1em]"
              />
              <a
                href="https://www.astronauts.id"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-company-link"
                style={{ color: '#737373', fontWeight: 400 }}
              >
                ASTRO
              </a>
            </span>
          </p>

          {/* CTAs */}
          <div className="animate-in flex md:justify-start justify-center items-center gap-3 flex-wrap">
            <CopyEmailButton variant="hero" />
            <a href="/about">
              <Button variant="white" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 500 }}>About</Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
