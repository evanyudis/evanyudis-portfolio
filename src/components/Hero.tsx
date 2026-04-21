'use client'

import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section
      className="w-full px-6 pt-[120px] pb-[88px]"
      style={{ backgroundColor: '#fafafa' }}
    >
      <div className="max-w-[640px]">

        {/* Name */}
        <h1
          className="mb-3"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#141414',
            lineHeight: '1.4',
            letterSpacing: '0px',
          }}
        >
          Evan Yudistira
        </h1>

        {/* Intro */}
        <p
          className="mb-3"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '18px',
            fontWeight: 400,
            color: 'rgba(20,20,20,0.6)',
            lineHeight: '1.5',
          }}
        >
          Sr. Product Designer with 7+ years designing product across industries.
        </p>

        {/* Currently at */}
        <p
          className="mb-6"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: 'rgba(20,20,20,0.5)',
            lineHeight: '1.5',
          }}
        >
          Currently designing at{' '}
          <a
            href="https://www.kredivo.id"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 500 }}
          >
            Kredivo
          </a>
        </p>

        {/* Previously */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#a3a3a3',
            lineHeight: '1.5',
          }}
        >
          Previously: Tokopedia · TikTok Shop · AdMedika
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3 flex-wrap">
          <a href="#work">
            <Button variant="black">View Work</Button>
          </a>
          <a href="mailto:evanditoevan@gmail.com">
            <Button variant="gray">Get in touch</Button>
          </a>
        </div>

      </div>
    </section>
  )
}
