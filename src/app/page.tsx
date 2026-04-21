import { ScrollReveal } from '@/components/ScrollReveal'
import { Hero } from '@/components/Hero'
import { ProjectGrid } from '@/components/ProjectGrid'
import { ExperienceList } from '@/components/ExperienceList'
import { ToolkitSection } from '@/components/ToolkitSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero */}
      <Hero />

      {/* Work Grid */}
      <section id="work" className="w-full py-[88px] px-6">
        <div className="max-w-[640px] mx-auto">
          <p className="text-xs font-mono text-[#a3a3a3] mb-3 tracking-wider uppercase">
            Selected Projects
          </p>
          <h2 className="text-3xl font-medium text-black mb-12" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Work
          </h2>
          <ProjectGrid />
        </div>
      </section>

      {/* About — jaimec.co style */}
      <section id="about" className="w-full py-[88px] px-6" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-[640px] mx-auto">
          <p className="text-xs font-mono text-[#a3a3a3] mb-3 tracking-wider uppercase">About</p>
          <h2
            className="text-2xl font-medium text-black mb-6"
            style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontSize: '22px', fontWeight: 500 }}
          >
            I&apos;m Evan.
          </h2>
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#525252',
              lineHeight: '1.65',
            }}
          >
            7+ years designing product across fintech and e-commerce. Built the Flex design system at Kredivo — 491 components, full token system. Knows front-end too: built Figma plugins, writes React and Tailwind. Mentored 100+ designers at RevoU.
          </p>
          <p
            className="mb-10"
            style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              color: '#525252',
              lineHeight: '1.65',
            }}
          >
            Currently at Kredivo. Previously at Tokopedia | TikTok Shop and AdMedika.
          </p>
          <a
            href="/about"
            style={{
              fontFamily: 'var(--font-geist), system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#262626',
              borderBottom: '1px solid #e5e5e5',
              paddingBottom: '2px',
            }}
          >
            More about me →
          </a>
        </div>
      </section>

      {/* Toolkit */}
      <ToolkitSection />

      {/* Experience */}
      <section id="experience" className="w-full py-[88px] px-6" style={{ backgroundColor: '#fafafa' }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal stagger selector=".experience-item">
            <ExperienceList />
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6" style={{ backgroundColor: '#090909' }}>
        <ScrollReveal>
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: '#a3a3a3' }}>© 2026 Evan Yudistira</p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:evanditoevan@gmail.com"
                className="text-sm no-underline hover:text-white transition-colors"
                style={{ color: '#a3a3a3' }}
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/evanyudistira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm no-underline hover:text-white transition-colors"
                style={{ color: '#a3a3a3' }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/evanyudistira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm no-underline hover:text-white transition-colors"
                style={{ color: '#a3a3a3' }}
              >
                GitHub
              </a>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  )
}
