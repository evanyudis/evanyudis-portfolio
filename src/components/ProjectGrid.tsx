'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
  cover_image?: string
  company?: string
  role?: string
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <a
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="project-card group block bg-white border border-light-gray rounded-container overflow-hidden transition-all duration-160 hover:border-mid-gray"
        >
          {/* Cover Image */}
          <div className="aspect-[16/10] bg-light-gray overflow-hidden">
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

          {/* Card Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags?.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-pill bg-light-gray text-stone"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className="text-xl text-black mb-1 transition-colors duration-150 group-hover:text-stone"
              style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 400 }}
            >
              {project.title}
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-stone">
              {project.company && <span>{project.company}</span>}
              {project.company && project.role && <span>·</span>}
              {project.role && <span>{project.role}</span>}
              {project.year && <span>· {project.year}</span>}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
