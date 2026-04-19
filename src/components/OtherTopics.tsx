'use client'

import { useState } from 'react'

interface TopicItem {
  label: string
  href: string
  external?: boolean
}

interface TopicCategory {
  title: string
  items: TopicItem[]
}

export function OtherTopics() {
  const categories: TopicCategory[] = [
    {
      title: 'Writing',
      items: [
        { label: 'Design Systems 101', href: '#' },
        { label: 'Scaling Design Teams', href: '#' },
        { label: 'Prototyping Best Practices', href: '#' },
      ],
    },
    {
      title: 'Speaking',
      items: [
        { label: 'DesignConf 2024', href: '#' },
        { label: 'Figma Communities', href: '#' },
      ],
    },
    {
      title: 'Freelance',
      items: [
        { label: 'Fintech Dashboard', href: '#' },
        { label: 'Healthcare App Redesign', href: '#' },
      ],
    },
    {
      title: 'Mentorship',
      items: [
        { label: '1:1 Mentoring', href: '#' },
        { label: 'Career Coaching', href: '#' },
      ],
    },
  ]

  return (
    <section id="topics" className="w-full py-section px-6">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-xs font-mono text-silver mb-3 tracking-wider uppercase">Beyond work</p>
        <h2 className="text-2xl font-medium text-black mb-8">Other Topics</h2>

        <div className="flex flex-wrap gap-8">
          {categories.map((category) => (
            <div key={category.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-mid-gray">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-pill border transition-colors hover:border-mid-gray"
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: '#e5e5e5',
                      color: '#525252',
                    }}
                  >
                    {item.label}
                    {item.external && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1H9V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}