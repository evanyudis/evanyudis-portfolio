import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Evan Yudistira',
  description: 'Senior Product Designer with 7+ years of experience in design systems, ecommerce, and product design.',
}

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

          {/* Stacks */}
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
              Stacks
            </h2>
            <div
              className="stack-wrapper"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'inline-flex',
              }}
            >
              <div className="flex gap-3">
                {[
                  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
                  { name: 'Obsidian', icon: 'https://gdm-catalog-fmapi-prod.imgix.net/ProductLogo/53c7cb96-7407-4a94-8219-60f6f5543fe3.png?w=80&h=80&fit=max&dpr=3&auto=format&q=50' },
                  { name: 'Claude', icon: 'https://www.stickpng.com/img/icons-logos-emojis/ai-tools/claude-ai-logo' },
                  { name: 'Hermes', icon: 'https://raw.githubusercontent.com/nousresearch/hermes-agent/main/assets/banner.png' },
                  { name: 'Vercel', icon: 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png' },
                  { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
                  { name: 'Dia', icon: 'https://cdn.sanity.io/images/e5fj2khm/production/224e62ee0cc323b1d50fe1407dcab3333e27a33e-480x400.png?w=64&h=64&fit=contain&q=80' },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="stack-icon"
                    title={tool.name}
                  >
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        objectFit: 'contain',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '6px',
                        padding: '4px',
                      }}
                    />
                  </div>
                ))}
              </div>
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
