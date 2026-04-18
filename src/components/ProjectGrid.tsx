import { Card } from '@/components/ui/Card'
import { Tag } from '@/components/ui/Tag'
import { supabase } from '@/lib/supabase'

interface Project {
  slug: string
  title: string
  tags: string[]
  year: string
}

async function getFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('slug, title, tags, year')
    .eq('featured', true)
    .order('created_at', { ascending: false })

  if (error || !data) {
    console.error('Error fetching projects:', error)
    return []
  }

  return data as Project[]
}

export async function ProjectGrid() {
  const projects = await getFeaturedProjects()

  if (projects.length === 0) {
    return (
      <p className="text-stone">No projects found.</p>
    )
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
