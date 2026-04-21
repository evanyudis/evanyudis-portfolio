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
  thumbnail_url?: string
}

type Category = 'All' | 'Commercial' | 'My products' | 'Awards'

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch('/api/projects')
  if (!res.ok) return []
  return res.json()
}

const CATEGORIES: Category[] = ['All', 'Commercial', 'My products', 'Awards']

// Generate a consistent placeholder image based on slug
function getPlaceholderImage(slug: string): string {
  const colors = ['E5E5E5', 'D4D4D4', 'E8E8E8', 'F0F0F0', 'EBEBEB']
  const color = colors[slug.charCodeAt(0) % colors.length]
  return `https://via.placeholder.com/600x400/${color}/737373?text=${encodeURIComponent(slug.split('-')[0])}`
}

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
        {/* 2-col skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#e5e5e5] animate-pulse rounded-xl" style={{ height: '340px' }} />
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

      {/* Projects grid — 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project) => (
          <a
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="project-item group block bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-[#e5e5e5]"
          >
            {/* Thumbnail */}
            <div className="w-full bg-[#f5f5f5] overflow-hidden" style={{ aspectRatio: '16/10' }}>
              <img
                src={project.thumbnail_url || getPlaceholderImage(project.slug)}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Card content */}
            <div className="p-5">
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: '#f5f5f5',
                        color: '#737373',
                        fontFamily: 'var(--font-geist), system-ui, sans-serif',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title + Year */}
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3
                  className="text-lg text-black transition-colors duration-200 group-hover:text-stone"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 500, letterSpacing: '-0.02em' }}
                >
                  {project.title}
                </h3>
                {project.year && (
                  <span className="text-xs text-[#a3a3a3] shrink-0" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
                    {project.year}
                  </span>
                )}
              </div>

              {/* Context/description */}
              {project.context && (
                <p
                  className="text-sm text-[#737373] leading-relaxed mb-4 line-clamp-2"
                  style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif', fontWeight: 400 }}
                >
                  {project.context.slice(0, 120)}{project.context.length > 120 ? '...' : ''}
                </p>
              )}

              {/* View Case Study */}
              <span
                className="inline-flex items-center gap-2 text-sm transition-all duration-200 group-hover:gap-3"
                style={{
                  fontFamily: 'var(--font-geist), system-ui, sans-serif',
                  fontWeight: 500,
                  color: '#525252',
                }}
              >
                View Case Study
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:translate-x-0.5">
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
