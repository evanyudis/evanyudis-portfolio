'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  stagger?: boolean
  selector?: string
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  stagger = false,
  selector = '.reveal-item',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: reduce)', () => {
        // Skip animation — just show content
        if (containerRef.current) {
          gsap.set(containerRef.current, { opacity: 1, y: 0 })
        }
        return () => {}
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (stagger && containerRef.current) {
          // Staggered children reveal
          const items = containerRef.current.querySelectorAll(selector)
          gsap.fromTo(
            items,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
              delay,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 88%',
                once: true,
              },
            }
          )
        } else if (containerRef.current) {
          // Single element reveal
          gsap.fromTo(
            containerRef.current,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              delay,
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 88%',
                once: true,
              },
            }
          )
        }
        return () => {}
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
