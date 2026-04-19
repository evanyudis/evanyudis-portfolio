import { ScrollReveal } from '@/components/ScrollReveal'
import { Hero } from '@/components/Hero'
import { ProjectGrid } from '@/components/ProjectGrid'
import { ExperienceList } from '@/components/ExperienceList'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <Hero />

      {/* Work Grid */}
      <section id="work" className="w-full py-section px-6 bg-snow">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-medium text-black mb-12">
            Selected Projects
          </h2>
          <ScrollReveal stagger selector=".project-card">
            <ProjectGrid />
          </ScrollReveal>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-medium text-black mb-12">
            Experience
          </h2>
          <ScrollReveal stagger selector=".experience-item">
            <ExperienceList />
          </ScrollReveal>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="w-full py-section px-6 bg-snow">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-medium text-black mb-8">
            Education
          </h2>
          <ScrollReveal>
            <div className="border-t border-light-gray pt-8">
              <h3 className="text-lg font-normal text-black mb-2">
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
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  )
}
