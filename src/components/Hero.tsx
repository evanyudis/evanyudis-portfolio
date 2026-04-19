'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { CopyEmailButton } from '@/components/CopyEmailButton'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (containerRef.current) {
          gsap.set(containerRef.current.children, { opacity: 1, y: 0 })
        }
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const title = containerRef.current?.querySelector('.hero-title')
        const subtitle = containerRef.current?.querySelector('.hero-subtitle')
        const actions = containerRef.current?.querySelector('.hero-actions')
        if (!title || !subtitle || !actions) return

        const tl = gsap.timeline()
        tl.fromTo(title, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
          .fromTo(subtitle, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3')
          .fromTo(actions, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }, '-=0.2')
        return () => {}
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="w-full py-section-lg px-6"
    >
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="hero-title text-5xl md:text-6xl font-medium text-black mb-6">
          26&apos; Portfolio
        </h1>
        <p className="hero-subtitle text-lg md:text-xl text-stone max-w-2xl mx-auto mb-8 leading-relaxed">
          Hey, I&apos;m Evan a sr. product designer at Kredivo based in Jakarta,
          Indonesia. I design scalable product experiences with a strong focus on
          design systems, thoughtful interaction, and high-quality execution across
          web and mobile.
        </p>
        <div className="hero-actions flex items-center justify-center gap-4 flex-wrap">
          <a href="#work">
            <Button variant="black">View Work</Button>
          </a>
          <CopyEmailButton />
        </div>
      </div>
    </section>
  )
}
