import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Evan Yudistira',
  description: 'Senior Product Designer with 7+ years of experience in design systems, ecommerce, and product design.',
}

const toolkit = [
  'Figma',
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Supabase',
  'GSAP',
]

const experience = [
  {
    company: 'Kredivo',
    role: 'Sr. Product Designer',
    period: 'Oct 2025 — Present',
  },
  {
    company: 'Tokopedia',
    role: 'Sr. Product Designer',
    period: '2024 — 2025',
  },
  {
    company: 'Tokopedia',
    role: 'Product Designer',
    period: '2021 — 2024',
  },
  {
    company: 'ASTRO',
    role: 'Product Designer',
    period: '2020 — 2021',
  },
]

const contactLinks = [
  { label: 'Email', href: 'mailto:evanditoevan@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/evanyudistira' },
  { label: 'GitHub', href: 'https://github.com/evanyudistira' },
]

export default function AboutPage() {
  return (
    <section className="w-full min-h-[85vh] px-6 py-section" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-[640px]">

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.6',
            marginBottom: '48px',
          }}>
            Hey, I&apos;m Evan, a product designer with 7+ years of experience. Currently part of the design team at Kredivo. I&apos;ve specialized in design systems, fintech, and e-commerce — designing experiences that move customers from browsing to buying. In that time I&apos;ve had the opportunity to work with talented product, technology, design, and engineering teams tackling challenging problems.
          </p>

          {/* Toolkit */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '1px',
              lineHeight: '1.4',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              Current Toolkit
            </h2>
            <div className="flex flex-wrap gap-2">
              {toolkit.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-geist), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#141414',
                    letterSpacing: '0px',
                    padding: '4px 0',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '1px',
              lineHeight: '1.4',
              marginBottom: '24px',
              textTransform: 'uppercase',
            }}>
              Experience
            </h2>

            <div>
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start" style={{ paddingBottom: '16px' }}>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-geist), system-ui, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#141414',
                        letterSpacing: '0px',
                        lineHeight: '1.4',
                      }}>
                        {exp.company}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-geist), system-ui, sans-serif',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: '#737373',
                        letterSpacing: '0px',
                        lineHeight: '1.4',
                      }}>
                        {exp.role}
                      </p>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-geist), system-ui, sans-serif',
                      fontSize: '12px',
                      fontWeight: 400,
                      color: '#737373',
                      letterSpacing: '0px',
                      lineHeight: '1.4',
                      textAlign: 'right',
                    }}>
                      {exp.period}
                    </p>
                  </div>
                  {i < experience.length - 1 && (
                    <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)', marginBottom: '16px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '1px',
              lineHeight: '1.4',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              Contact
            </h2>
            <div className="flex flex-col gap-2">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="about-contact-link"
                >
                  {link.label}
                  <span className="about-link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
