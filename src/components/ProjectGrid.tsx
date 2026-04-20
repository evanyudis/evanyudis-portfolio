'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import gsap from 'gsap'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
  cover_image?: string
  company?: string
  role?: string
}

// Hardcoded project data — descriptions and company logos for now
// Replace with Supabase fields when schema is updated
const PROJECT_DETAILS: Record<string, {
  description: string
  background: string
  impact: string
  companyLogo?: string
}> = {
  'flex-design-system': {
    description: 'Kredivo\'s design system powering 40+ products',
    background: 'Built a comprehensive design system from the ground up for a leading Indonesian fintech, consolidating 6 fragmented product teams under a single component library.',
    impact: 'Reduced design-to-dev handoff time by 60% and achieved consistent cross-team UI implementation across all products.',
    companyLogo: '/company-logos/kredivo.png',
  },
  'gainz': {
    description: 'Fitness tracking app with workout logging',
    background: 'Vibecoded a gym companion app focused on progressive overload tracking, body composition logging, and workout program management.',
    impact: 'Replaced spreadsheet tracking with a dedicated mobile-first app, enabling faster workout logging during gym sessions.',
    companyLogo: '/company-logos/bytedance.svg',
  },
  'feedbuddy': {
    description: 'Breastfeeding & diaper tracker for new parents',
    background: 'Built a PWA to help new parents track feeding sessions, pumping output, and diaper changes for their newborn.',
    impact: 'Replaced scattered notes with a unified tracking app, reducing mental load during the exhausting newborn phase.',
    companyLogo: '/company-logos/tokopedia.png',
  },
  'bumpbuddy': {
    description: 'Pregnancy companion app for tracking maternal health',
    background: 'Designed and built a pregnancy tracking app for a spouse\'s journey, with contraction timer, milestone logging, and provider communication features.',
    impact: 'Provided a dedicated tool for tracking high-risk pregnancy progress and coordinating with medical providers.',
    companyLogo: '/company-logos/astronauts.png',
  },
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('slug, title, tags, year, cover_image, company, role')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setProjects(data as Project[])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (loading || projects.length === 0 || !containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [loading, projects])

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-light-gray animate-pulse rounded-container"
            style={{ height: '320px' }}
          />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return <p className="text-stone">No projects found.</p>
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-6">
      {projects.map((project) => {
        const details = PROJECT_DETAILS[project.slug]
        return (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-item group block bg-white border border-light-gray rounded-container overflow-hidden transition-all duration-200 hover:border-mid-gray"
          >
            {/* Visual — Full width cover image */}
            <div className="aspect-[16/9] bg-light-gray overflow-hidden">
              {project.cover_image ? (
                <img
                  src={project.cover_image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-stone text-sm">{project.title}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title row: project name + company logo + company name */}
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-2xl text-black transition-colors duration-150 group-hover:text-stone"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  {project.title}
                </h3>
                {details?.companyLogo && (
                  <div className="flex items-center gap-2">
                    <img
                      src={details.companyLogo}
                      alt={project.company}
                      className="h-5 w-auto object-contain"
                      style={{ opacity: 0.7 }}
                    />
                    {project.company && (
                      <span
                        className="text-sm text-stone"
                        style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
                      >
                        {project.company}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p
                className="text-base text-stone mb-4 leading-relaxed"
                style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
              >
                {details?.description || project.role}
              </p>

              {/* Background + Impact */}
              {details && (
                <div className="mb-6 space-y-2">
                  <p
                    className="text-sm text-stone leading-relaxed"
                    style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
                  >
                    {details.background}
                  </p>
                  <p
                    className="text-sm text-stone leading-relaxed"
                    style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 500, color: '#141414' }}
                  >
                    {details.impact}
                  </p>
                </div>
              )}

              {/* View Case Study button */}
              <div>
                <span
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-150 group-hover:gap-3"
                  style={{
                    fontFamily: 'var(--font-geist), system-ui, sans-serif',
                    fontWeight: 500,
                    color: '#737373',
                  }}
                >
                  View Case Study
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-150 group-hover:translate-x-0.5">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
