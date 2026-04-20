import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Evan Yudistira',
  description: 'Senior Product Designer with 7+ years of experience in design systems, ecommerce, and product design.',
}

const skills = [
  'Design Systems',
  'Product Design',
  'UI/UX Design',
  'Front-end Development',
  'E-commerce',
  'Interaction Design',
]

const tools = [
  'Figma',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Supabase',
  'TypeScript',
]

const socialLinks = [
  { label: 'Email', href: 'mailto:evanditoevan@gmail.com', prefix: '' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/evanyudistira', prefix: '' },
  { label: 'GitHub', href: 'https://github.com/evanyudistira', prefix: '' },
]

export default function AboutPage() {
  return (
    <section className="w-full min-h-[85vh] px-6 py-section" style={{ backgroundColor: '#fafafa' }}>
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-[640px]">

          {/* Heading */}
          <h1 style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#737373',
            letterSpacing: '0px',
            lineHeight: '1.4',
            marginBottom: '32px',
            textTransform: 'uppercase',
          }}>
            About
          </h1>

          {/* Bio */}
          <p style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#141414',
            letterSpacing: '0px',
            lineHeight: '1.6',
            marginBottom: '16px',
          }}>
            Senior Product Designer with 7+ years of experience designing product experiences across industries — from fintech and e-commerce to design tools and early-stage startups.
          </p>

          <p style={{
            fontFamily: 'var(--font-geist), system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            color: '#737373',
            letterSpacing: '0px',
            lineHeight: '1.6',
            marginBottom: '48px',
          }}>
            Currently at Kredivo, previously at ByteDance, Tokopedia, and ASTRO. I specialize in design systems, interaction design, and bridging the gap between design and engineering.
          </p>

          {/* Skills */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '0.5px',
              lineHeight: '1.4',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              Capabilities
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'var(--font-geist), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#141414',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '0.5px',
              lineHeight: '1.4',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              Tools
            </h2>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-geist), system-ui, sans-serif',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: '#737373',
                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                    padding: '4px 12px',
                    borderRadius: '100px',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#737373',
              letterSpacing: '0.5px',
              lineHeight: '1.4',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}>
              Connect
            </h2>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-geist), system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#141414',
                    textDecoration: 'none',
                    transition: 'color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#737373')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#141414')}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
