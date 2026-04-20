import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Evan Yudistira',
  description: 'Senior Product Designer with 6+ years of experience in design systems, ecommerce, and product design.',
}

export default function AboutPage() {
  return (
    <section className="w-full min-h-[85vh] px-6 py-section" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-[640px]">
          <h1 style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '28px',
            fontWeight: 400,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.2',
            marginBottom: '24px'
          }}>
            About
          </h1>
          <p style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            I&apos;m a Senior Product Designer with over six years of experience, focusing on design systems, ecommerce, and product design. Currently at Kredivo, previously at ByteDance, Tokopedia, and Astro.
          </p>
          <p style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#737373',
            letterSpacing: '0px',
            lineHeight: '1.6',
          }}>
            I design scalable product experiences with a focus on thoughtful interaction and high-quality execution. When I&apos;m not designing, I&apos;m building tools to automate and track everything.
          </p>
        </div>
      </div>
    </section>
  )
}
