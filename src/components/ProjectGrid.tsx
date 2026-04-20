'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
  cover_image?: string
  role?: string
  team?: string
  context?: string
  background?: string
  impact?: string
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('slug, title, tags, year, cover_image, role, team, context, background, impact')
        .eq('featured', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setProjects(data as Project[])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

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
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
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
            {/* Title row: project name + role */}
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-2xl text-black transition-colors duration-150 group-hover:text-stone"
                style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
              >
                {project.title}
              </h3>
              {project.role && (
                <span
                  className="text-sm text-stone"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}
                >
                  {project.role}
                </span>
              )}
            </div>

            {/* Context (short tagline) */}
            {project.context && (
              <p
                className="text-base text-stone mb-4 leading-relaxed"
                style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
              >
                {project.context}
              </p>
            )}

            {/* Background */}
            {project.background && (
              <p
                className="text-sm text-stone mb-2 leading-relaxed"
                style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
              >
                {project.background}
              </p>
            )}

            {/* Impact */}
            {project.impact && (
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 500, color: '#141414' }}
              >
                {project.impact.split('\n').filter(Boolean).map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
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
      ))}
    </div>
  )
}
