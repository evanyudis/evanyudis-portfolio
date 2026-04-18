'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { supabase } from '@/lib/supabase'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('slug, title, tags, year')
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
    return <p className="text-stone">Loading...</p>
  }

  if (projects.length === 0) {
    return <p className="text-stone">No projects found.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="group"
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags?.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h3 className="text-xl font-normal text-black mb-2 group-hover:text-stone transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-stone">{project.year}</p>
        </Card>
      ))}
    </div>
  )
}
