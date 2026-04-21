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

type Category = 'All' | 'Commercial' | 'My products' | 'Awards'

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects')
  if (!res.ok) return []
  return res.json()
}

const CATEGORIES: Category[] = ['All', 'Commercial', 'My products', 'Awards']

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  // Filter by category
  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.tags?.includes(activeCategory))

  if (loading) {
    return (
      <div className="flex flex-col">
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="bg-[#e5e5e5] animate-pulse rounded-full" style={{ width: '80px', height: '32px' }} />
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#e5e5e5] animate-pulse" style={{ height: '320px' }} />
          ))}
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return <p className="text-stone">No projects found.</p>
  }

  return (
    <div>
      {/* Category filter — horizontal scroll */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-black text-white'
                : 'bg-[#e5e5e5] text-[#525252] hover:bg-[#d4d4d4]'
            }`}
            style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 500 }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects list — vertical stack */}
      <div className="flex flex-col">
        {filtered.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-item group block border-b border-[#e5e5e5] py-8 transition-all duration-200 hover:border-[#737373]"
          >
            {/* Visual — full width, top */}
            <div
              className="w-full bg-[#e5e5e5] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-[1.005]"
              style={{ height: '260px' }}
            >
              <span className="text-[#a3a3a3] text-xs uppercase tracking-wider">Project Visual</span>
            </div>

            {/* Info — bottom */}
            <div className="max-w-[640px]">
              {/* Tag pills */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: '#e5e5e5',
                        color: '#525252',
                        fontFamily: 'var(--font-geist), system-ui, sans-serif',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title + year */}
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-xl text-black transition-colors duration-200 group-hover:text-stone"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400, letterSpacing: '-0.02em' }}
                >
                  {project.title}
                </h3>
                {project.year && (
                  <span className="text-xs text-[#a3a3a3]" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
                    {project.year}
                  </span>
                )}
              </div>

              {/* Description — two brief sentences */}
              {project.context && (
                <p
                  className="text-sm text-[#525252] leading-relaxed mb-4 transition-colors duration-200 group-hover:text-[#737373]"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
                >
                  {project.context.length > 150 ? project.context.slice(0, 150) + '...' : project.context}
                  {project.background ? ' ' + project.background.slice(0, 80) + (project.background.length > 80 ? '...' : '') : ''}
                </p>
              )}

              {/* View Case Study */}
              <span
                className="inline-flex items-center gap-2 text-sm transition-all duration-200 group-hover:gap-3"
                style={{
                  fontFamily: 'var(--font-geist), system-ui, sans-serif',
                  fontWeight: 500,
                  color: '#737373',
                }}
              >
                View Case Study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
