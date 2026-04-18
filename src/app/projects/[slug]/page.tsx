import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { supabase } from '@/lib/supabase'

interface PageProps {
  params: Promise<{ slug: string }>
}

interface ProcessStep {
  step: string
  content: string
}

interface Project {
  slug: string
  title: string
  tags: string[]
  role: string
  team: string
  year: string
  context: string
  background: string
  problem: string
  design_goals: string
  process: ProcessStep[]
  deliverables: string
  impact: string
  takeaways: string
}

async function getProject(slug: string): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data as Project
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) return { title: 'Project Not Found' }

  return {
    title: `${project.title} — Evan Yudistira`,
    description: project.context?.slice(0, 160),
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  return (
    <div className="min-h-screen bg-white">
      {/* Back link */}
      <div className="w-full pt-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-base text-stone no-underline hover:text-black transition-colors"
          >
            ← Work
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <section className="w-full py-12 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-black mb-6">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-6 text-base text-stone">
            {project.role && <p>Role: {project.role}</p>}
            {project.team && <p>Team: {project.team}</p>}
            {project.year && <p>Year: {project.year}</p>}
          </div>
        </div>
      </section>

      {/* Case Study Body */}
      <section className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-3xl space-y-12">
            {project.context && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Context</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.context}</div>
              </div>
            )}

            {project.background && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Background</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.background}</div>
              </div>
            )}

            {project.problem && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">The Problem</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.problem}</div>
              </div>
            )}

            {project.design_goals && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Design Goals</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.design_goals}</div>
              </div>
            )}

            {project.process && project.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-6">Design Process</h2>
                <div className="space-y-8">
                  {project.process.map((step, idx) => (
                    <div key={idx}>
                      <h3 className="text-lg font-medium text-black mb-2">
                        {step.step}
                      </h3>
                      <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">
                        {step.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.deliverables && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Deliverables</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.deliverables}</div>
              </div>
            )}

            {project.impact && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Impact</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.impact}</div>
              </div>
            )}

            {project.takeaways && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Key Takeaways</h2>
                <div className="text-base text-stone whitespace-pre-wrap leading-relaxed">{project.takeaways}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-light-gray">
        <div className="max-w-screen-xl mx-auto">
          <Link href="/">
            <Button variant="gray">← Back to Home</Button>
          </Link>
        </div>
      </footer>
    </div>
  )
}
