import { ScrollReveal } from '@/components/ScrollReveal'
import { Hero } from '@/components/Hero'
import { ProjectGrid } from '@/components/ProjectGrid'
import { OtherTopics } from '@/components/OtherTopics'
import { ExperienceList } from '@/components/ExperienceList'
import { ToolkitSection } from '@/components/ToolkitSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <Hero />

      {/* Work Grid */}
      <section id="work" className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-mono text-silver mb-3 tracking-wider uppercase">Selected Projects</p>
          <h2 className="text-3xl font-medium text-black mb-12">
            Work
          </h2>
          <ScrollReveal stagger selector=".project-card">
            <ProjectGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Other Topics */}
      <OtherTopics />

      {/* Experience */}
      <section id="experience" className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <ScrollReveal stagger selector=".experience-item">
            <ExperienceList />
          </ScrollReveal>
        </div>
      </section>

      {/* My Toolkit */}
      <ToolkitSection />

      {/* Education */}
      <section id="education" className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-xs font-mono text-silver mb-3 tracking-wider uppercase">Education</p>
          <ScrollReveal>
            <div
              className="rounded-container border p-6"
              style={{ borderColor: '#e5e5e5', maxWidth: '600px' }}
            >
              <h3 className="text-lg font-medium text-black mb-2">
                Bachelor of Computer Science (S.Kom)
              </h3>
              <p className="text-base text-mid-gray mb-2">Brawijaya University — Malang, ID</p>
              <p className="text-base text-stone leading-relaxed">
                Major in System Information, conducted research to measure the quality of the
                Information System Study Program website using WebQual 4.0 and Importance &amp;
                Performance Analysis.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-darkest-surface">
        <ScrollReveal>
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-silver">© 2026 Evan Yudistira</p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:evanditoevan@gmail.com"
                className="text-sm text-silver no-underline hover:text-white transition-colors"
              >
                Email
              </a>
              <a
                href="https://linkedin.com/in/evanyudistira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-silver no-underline hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/evanyudistira"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-silver no-underline hover:text-white transition-colors"
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