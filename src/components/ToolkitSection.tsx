'use client'

import { useState } from 'react'

const toolCategories = {
  Design: [
    { name: 'Figma', icon: '◇' },
    { name: 'Framer', icon: '◈' },
    { name: 'Adobe XD', icon: '◫' },
    { name: 'Photoshop', icon: '◻' },
    { name: 'Illustrator', icon: '◆' },
    { name: 'After Effects', icon: '▣' },
    { name: 'Lottie', icon: '◉' },
  ],
  Development: [
    { name: 'HTML/CSS', icon: '◧' },
    { name: 'JavaScript', icon: '◨' },
    { name: 'TypeScript', icon: '◩' },
    { name: 'React', icon: '◪' },
    { name: 'Next.js', icon: '◫' },
    { name: 'Tailwind CSS', icon: '◬' },
    { name: 'GSAP', icon: '◭' },
  ],
  'Workflow & Utilities': [
    { name: 'Git', icon: '◮' },
    { name: 'GitHub', icon: '◯' },
    { name: 'Notion', icon: '◰' },
    { name: 'Linear', icon: '◱' },
    { name: 'Miro', icon: '◲' },
    { name: 'Storybook', icon: '◳' },
  ],
  'AI & Assistive': [
    { name: 'Claude', icon: '◇' },
    { name: 'ChatGPT', icon: '◈' },
    { name: 'Copilot', icon: '◉' },
    { name: 'Midjourney', icon: '◊' },
    { name: 'Runway', icon: '◌' },
    { name: 'Suno', icon: '◍' },
  ],
}

type CategoryKey = keyof typeof toolCategories

export function ToolkitSection() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('Design')

  return (
    <section id="toolkit" className="w-full py-section px-6 bg-snow">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-xs font-mono text-silver mb-3 tracking-wider uppercase">My Toolkit</p>
        <h2 className="text-2xl font-medium text-black mb-6">Tools I use</h2>

        {/* Tab pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.keys(toolCategories) as CategoryKey[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className="px-4 py-2 text-sm font-medium rounded-pill transition-colors"
              style={{
                backgroundColor: activeTab === category ? '#e5e5e5' : 'transparent',
                color: activeTab === category ? '#262626' : '#737373',
                border: '1px solid',
                borderColor: activeTab === category ? '#e5e5e5' : '#d4d4d4',
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tool pills grid */}
        <div className="flex flex-wrap gap-3">
          {toolCategories[activeTab].map((tool) => (
            <div
              key={tool.name}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill border transition-colors"
              style={{
                borderColor: '#e5e5e5',
                backgroundColor: 'white',
              }}
            >
              <span className="text-base" style={{ color: '#525252' }}>{tool.icon}</span>
              <span className="text-sm font-medium" style={{ color: '#262626' }}>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}