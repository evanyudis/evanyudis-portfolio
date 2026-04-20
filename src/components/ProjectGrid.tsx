'use client'

import { useEffect, useState } from 'react'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
  role?: string
  team?: string
  context?: string
  background?: string
  impact?: string
}

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects')
  if (!res.ok) return []
  return res.json()
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-light-gray animate-pulse rounded-container"
            style={{ height: '200px' }}
          />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return <p className="text-stone">No projects found.</p>
  }

  return (
    <div className="flex flex-col gap-3">
      {projects.map((project) => (
        <a
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="project-item group block bg-white border border-light-gray rounded-container overflow-hidden transition-all duration-200 hover:border-mid-gray"
        >
          <div className="flex flex-row">
            {/* Visual — left side, gray placeholder */}
            <div
              className="w-[180px] min-w-[180px] bg-[#e5e5e5] flex items-center justify-center"
              style={{ minHeight: '160px' }}
            >
              <span className="text-[#a3a3a3] text-xs uppercase tracking-wider">Project Visual</span>
            </div>

            {/* Content — right side */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                {/* Title + company row */}
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-xl text-black transition-colors duration-150 group-hover:text-stone"
                    style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {project.year && (
                      <span className="text-xs text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
                        {project.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description — two brief sentences */}
                <div className="mb-0">
                  {project.context && (
                    <p
                      className="text-sm text-[#525252] leading-relaxed"
                      style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
                    >
                      {project.context.length > 150 ? project.context.slice(0, 150) + '...' : project.context}
                      {project.background ? ' ' + project.background.slice(0, 80) + (project.background.length > 80 ? '...' : '') : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* View Case Study — secondary button style */}
              <div className="mt-auto pt-4">
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
          </div>
        </a>
      ))}
    </div>
  )
}
