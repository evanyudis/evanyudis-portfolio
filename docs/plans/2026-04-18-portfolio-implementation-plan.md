# Portfolio Redesign — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build evanyudis portfolio with Next.js 15 + Tailwind v4 + Supabase CMS using Ollama design system.

**Architecture:** Supabase-backed project data with ISR. Landing page fetches featured projects; `/projects/[slug]` fetches full case study. Hermes manages content via Supabase CRUD.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Supabase (PostgreSQL), Vercel

**Spec:** `docs/superpowers/specs/2026-04-18-portfolio-redesign-ollama-design.md`
**Design Reference:** `/tmp/DESIGN.md`

---

## Phase 1: Project Setup

### Task 1: Initialize Next.js 15 + Tailwind v4 Project

**Objective:** Scaffold fresh Next.js 15 project with Tailwind v4

**Commands:**
```bash
cd ~
# npx create-next-app@latest evanyudis-portfolio --typescript --tailwind --eslint --app --src-dir --no-import-alias
# For v4 specifically:
cd ~/evanyudis-portfolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes 2>&1
```

**Expected:** Next.js 15 project scaffolded with Tailwind enabled

**Verification:** `ls` shows `app/`, `app/globals.css` contains Tailwind directives

---

### Task 2: Install Supabase Client

**Objective:** Add Supabase JS client dependency

**Commands:**
```bash
cd ~/evanyudis-portfolio
npm install @supabase/supabase-js
```

**Verification:** `package.json` shows `@supabase/supabase-js` in dependencies

---

### Task 3: Configure Environment Variables

**Objective:** Set up `.env.local` for Supabase credentials

**Files:**
- Create: `evanyudis-portfolio/.env.local`

**Content:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Verification:** `.env.local` exists (DO NOT commit this file — add to .gitignore if not already)

---

### Task 4: Create Supabase Client Utility

**Objective:** Set up Supabase client for Next.js (server + client compatible)

**Files:**
- Create: `evanyudis-portfolio/src/lib/supabase.ts`

**Code:**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Verification:** File exists with correct export

---

### Task 5: Create Projects Table in Supabase

**Objective:** Create the `projects` table with all required columns

**Method:** Use Supabase SQL Editor or Hermes Supabase skill

**SQL:**
```sql
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  role TEXT,
  team TEXT,
  year TEXT,
  context TEXT,
  background TEXT,
  problem TEXT,
  design_goals TEXT,
  process JSONB DEFAULT '[]',
  deliverables TEXT,
  impact TEXT,
  takeaways TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for ISR/SSR)
CREATE POLICY "Allow public read" ON public.projects
  FOR SELECT USING (true);

-- Allow authenticated inserts (Hermes service role key)
CREATE POLICY "Allow authenticated insert" ON public.projects
  FOR INSERT WITH CHECK (true);

-- Allow authenticated updates
CREATE POLICY "Allow authenticated update" ON public.projects
  FOR UPDATE USING (true);

-- Allow authenticated deletes
CREATE POLICY "Allow authenticated delete" ON public.projects
  FOR DELETE USING (true);
```

**Verification:** Table exists in Supabase dashboard with all columns

---

## Phase 2: Design System

### Task 6: Configure Tailwind Ollama Design Tokens

**Objective:** Add Ollama grayscale palette, typography, and spacing to Tailwind config

**Files:**
- Modify: `evanyudis-portfolio/tailwind.config.ts` (or `tailwind.config.js`)

**Code:**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      // Ollama Grayscale Palette
      black: "#000000",
      "near-black": "#262626",
      "darkest-surface": "#090909",
      white: "#ffffff",
      snow: "#fafafa",
      "light-gray": "#e5e5e5",
      stone: "#737373",
      "mid-gray": "#525252",
      silver: "#a3a3a3",
      "button-dark": "#404040",
      "border-light": "#d4d4d4",
    },
    fontFamily: {
      display: ["SF Pro Rounded", "system-ui", "-apple-system", "sans-serif"],
      sans: ["system-ui", "-apple-system", "sans-serif"],
      mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
    },
    borderRadius: {
      container: "12px",    // Cards, panels, code blocks
      pill: "9999px",       // Buttons, tabs, inputs, tags
    },
    spacing: {
      section: "88px",
      "section-lg": "112px",
    },
  },
  plugins: [],
};
export default config;
```

**Verification:** `npx tailwindcss --init` ran; config has Ollama tokens

---

### Task 7: Build Button Component (Pill Variants)

**Objective:** Create reusable button with Black/Gray/White pill variants

**Files:**
- Create: `evanyudis-portfolio/src/components/ui/Button.tsx`

**Code:**
```tsx
import React from "react";

type ButtonVariant = "black" | "gray" | "white";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variants = {
  black: "bg-black text-white border border-black",
  gray: "bg-light-gray text-near-black border border-light-gray",
  white: "bg-white text-button-dark border border-border-light",
};

export function Button({
  variant = "gray",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        px-6 py-2.5
        rounded-pill
        text-base font-normal
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Verification:** Component renders all 3 variants without errors

---

### Task 8: Build Card Component (Container)

**Objective:** Create project card for work grid

**Files:**
- Create: `evanyudis-portfolio/src/components/ui/Card.tsx`

**Code:**
```tsx
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function Card({ children, className = "", href }: CardProps) {
  const base = `
    block
    bg-white border border-light-gray rounded-container
    p-6 md:p-8
    no-underline
  `;

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
      </a>
    );
  }

  return <div className={`${base} ${className}`}>{children}</div>;
}
```

---

### Task 9: Build Tag Component

**Objective:** Create pill-shaped tag/badge

**Files:**
- Create: `evanyudis-portfolio/src/components/ui/Tag.tsx`

**Code:**
```tsx
import React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-3 py-1
        text-xs font-normal
        bg-light-gray text-near-black
        rounded-pill
        ${className}
      `}
    >
      {children}
    </span>
  );
}
```

---

### Task 10: Build Navigation Component

**Objective:** Create minimal nav — logo left, links right, transparent background

**Files:**
- Create: `evanyudis-portfolio/src/components/Navigation.tsx`

**Code:**
```tsx
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="w-full py-6 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-base font-normal text-black no-underline"
        >
          Evan Yudistira
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/#work"
            className="text-base font-normal text-black no-underline"
          >
            Work
          </Link>
          <Link
            href="/#experience"
            className="text-base font-normal text-black no-underline"
          >
            Experience
          </Link>
          <a
            href="mailto:evanditoevan@gmail.com"
            className="text-base font-normal text-black no-underline"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
```

---

### Task 11: Create Root Layout with Font and Navigation

**Objective:** Set up app layout with SF Pro Rounded font, Navigation, global styles

**Files:**
- Modify: `evanyudis-portfolio/src/app/layout.tsx`
- Modify: `evanyudis-portfolio/src/app/globals.css`

**globals.css additions:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: system-ui, -apple-system, sans-serif;
    background-color: #ffffff;
    color: #000000;
  }

  body {
    background-color: #ffffff;
    color: #000000;
  }

  /* SF Pro Rounded for headings */
  h1, h2, h3 {
    font-family: "SF Pro Rounded", system-ui, -apple-system, sans-serif;
    font-weight: 500;
    line-height: 1.0;
  }
}
```

**layout.tsx:**
```tsx
import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evan Yudistira — Senior Product Designer",
  description:
    "Senior product designer at Kredivo. I design scalable product experiences with a focus on design systems, thoughtful interaction, and high-quality execution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
```

---

## Phase 3: Pages

### Task 12: Build Landing Page — Hero Section

**Files:**
- Modify: `evanyudis-portfolio/src/app/page.tsx`

**Code:**
```tsx
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-section-lg px-6">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium text-black mb-6">
            26&apos; Portfolio
          </h1>
          <p className="text-lg md:text-xl text-stone max-w-2xl mx-auto mb-8 leading-relaxed">
            Hey, I&apos;m Evan a sr. product designer at Kredivo based in Jakarta,
            Indonesia. I design scalable product experiences with a strong focus on
            design systems, thoughtful interaction, and high-quality execution across
            web and mobile.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="black">View Work</Button>
            <Button
              variant="white"
              onClick={() => {
                navigator.clipboard.writeText("evanditoevan@gmail.com");
              }}
            >
              Copy Email
            </Button>
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section id="work" className="w-full py-section px-6 bg-snow">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-medium text-black mb-12">
            Selected Projects
          </h2>
          <ProjectGrid />
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-medium text-black mb-12">
            Experience
          </h2>
          <ExperienceList />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 bg-darkest-surface">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-silver">© 2026 Evan Yudistira</p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:evanditoevan@gmail.com"
              className="text-sm text-silver no-underline hover:text-white"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/evanyudistira"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-silver no-underline hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

---

### Task 13: Build ProjectGrid Component (Fetch from Supabase)

**Files:**
- Create: `evanyudis-portfolio/src/components/ProjectGrid.tsx`

**Code:**
```tsx
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { supabase } from "@/lib/supabase";

async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("slug, title, tags, year")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  return data || [];
}

export async function ProjectGrid() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) {
    return (
      <p className="text-stone">No projects found.</p>
    );
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
  );
}
```

---

### Task 14: Build ExperienceList Component

**Files:**
- Create: `evanyudis-portfolio/src/components/ExperienceList.tsx`

**Code:**
```tsx
export function ExperienceList() {
  const experiences = [
    {
      role: "Sr. Product Designer",
      company: "Kredivo",
      period: "Oct 2025 — NOW",
      description:
        "Spearheaded the establishment of Kredivo's Design System, working closely with both design and engineering teams.",
    },
    {
      role: "Sr. Product Designer",
      company: "Tokopedia | TikTok Shop",
      period: "2024 — 2025",
      description:
        "Led After-Sales experiences, including the Resolution Center, improving post-purchase clarity and user satisfaction.",
    },
    {
      role: "Product Designer",
      company: "Tokopedia | TikTok Shop",
      period: "2021 — 2024",
      description:
        "Led design for core modules including Homepage, Cart, Checkout, and Promotions, improving purchase flow and reducing friction.",
    },
    {
      role: "Product Designer",
      company: "AdMedika by Telkom",
      period: "2020 — 2021",
      description:
        "Built and maintained design system components across multiple products; served as primary Designer-in-Charge for Telkomsehat.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="border-t border-light-gray pt-8">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
            <h3 className="text-lg font-normal text-black">
              {exp.role}
            </h3>
            <p className="text-sm text-stone">{exp.period}</p>
          </div>
          <p className="text-base font-normal text-mid-gray mb-2">
            {exp.company}
          </p>
          <p className="text-base text-stone leading-relaxed">
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  );
}
```

---

### Task 15: Build Project Detail Page `/projects/[slug]`

**Files:**
- Create: `evanyudis-portfolio/src/app/projects/[slug]/page.tsx`

**Code:**
```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Evan Yudistira`,
    description: project.context?.slice(0, 160),
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Back link */}
      <div className="w-full pt-8 px-6">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-base text-stone no-underline hover:text-black"
          >
            ← Work
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <section className="w-full py-12 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags?.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-medium text-black mb-6">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row gap-6 text-base text-stone">
            {project.role && <p>Role: {project.role}</p>}
            {project.team && <p>Team: {project.team}</p>}
            {project.year && <p>Year: {project.year}</p>}
          </div>
        </div>
      </section>

      {/* Case Study Body — sections rendered from Supabase fields */}
      <section className="w-full py-section px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="prose prose-stone max-w-3xl space-y-12">
            {project.context && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Context</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.context}</div>
              </div>
            )}

            {project.background && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Background</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.background}</div>
              </div>
            )}

            {project.problem && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">The Problem</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.problem}</div>
              </div>
            )}

            {project.design_goals && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Design Goals</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.design_goals}</div>
              </div>
            )}

            {project.process && Array.isArray(project.process) && project.process.length > 0 && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-6">Design Process</h2>
                <div className="space-y-8">
                  {project.process.map((step: any, idx: number) => (
                    <div key={idx}>
                      <h3 className="text-lg font-medium text-black mb-2">
                        {step.step}
                      </h3>
                      <div className="text-base text-stone whitespace-pre-wrap">
                        {step.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.deliverables && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Deliverables</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.deliverables}</div>
              </div>
            )}

            {project.impact && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Impact</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.impact}</div>
              </div>
            )}

            {project.takeaways && (
              <div>
                <h2 className="text-2xl font-medium text-black mb-4">Key Takeaways</h2>
                <div className="text-base text-stone whitespace-pre-wrap">{project.takeaways}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 border-t border-light-gray">
        <div className="max-w-screen-xl mx-auto">
          <Link href="/">
            <Button variant="gray">← Back to Home</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
```

---

### Task 16: Add ISR Revalidation

**Objective:** Configure revalidation for fresh content without full rebuild

**Files:**
- Modify: `evanyudis-portfolio/src/app/projects/[slug]/page.tsx`

**Add after imports:**
```tsx
// Revalidate every 60 seconds
export const revalidate = 60;
```

**For landing page (optional):**
```tsx
export const revalidate = 60;
```

---

## Phase 4: Content Migration

### Task 17: Seed Existing Projects into Supabase

**Objective:** Insert existing portfolio projects (Kredivo DS, Tokopedia Checkout, etc.) into Supabase

**Method:** Use Hermes Supabase skill or direct SQL insert

**Data to seed:**

```json
[
  {
    "slug": "kredivo-design-system",
    "title": "Flex Design System — Kredivo",
    "tags": ["Mobile", "Product", "Design System"],
    "role": "Concept, UI/UX Design, Design System",
    "team": "Product Designers, Engineers, Product Managers",
    "year": "2025",
    "featured": true,
    "context": "As a Senior Product Designer at Kredivo, I was assigned as the sole Design PIC to establish a scalable Design System...",
    "background": "When I first joined, Kredivo already had a 'Design System' file in Figma...",
    "problem": "As Kredivo's product ecosystem grew, the absence of a scalable design foundation resulted in increasing inefficiency...",
    "design_goals": "- Establish a scalable Design System based on Atomic Design\n- Define a clear set of core components\n- Provide explicit rules for structure, behavior, and usage",
    "process": [
      {"step": "01 Design System Audit", "content": "I began by conducting a comprehensive audit of the existing Design System file..."},
      {"step": "02 Defining the System Concept", "content": "Based on the audit findings, I introduced a system-first approach grounded in Atomic Design principles..."},
      {"step": "03 Component Classification & Prioritization", "content": "Rather than building everything at once, I prioritized components that were used most frequently..."},
      {"step": "04 Component Construction", "content": "Each core component was built with a consistent standard..."}
    ],
    "deliverables": "- Flex Design System — A centralized and structured design system file\n- Core Component Library\n- Anatomy & Behavior Definition\n- Design Guidelines",
    "impact": "Business Impact:\n- Faster design iteration and reduced time-to-market\n- Lower design and engineering rework through standardized components...",
    "takeaways": "- A Design System is a product, not just a component library\n- Atomic Design provides a strong foundation for scalability\n- Lean systems are more sustainable than overly complex ones"
  },
  {
    "slug": "tokopedia-checkout",
    "title": "Seamless Purchase Flow — Tokopedia",
    "tags": ["Mobile App iOS/Android", "Product"],
    "role": "Concept, UI/UX, UX Research, Prototype, Design System",
    "team": "Product Designer, UX Researcher, UX Writer, Product Managers",
    "year": "2024–2025",
    "featured": true,
    "context": "Since H2 '24, I've led the design for the entire purchase experience—covering the shopping cart, checkout, and order management...",
    "background": "Aligning the 2025 vision to signify more on promo affordability and social proofs...",
    "problem": "Lack of continuity & transparency — Insufficient valuable promotions, and inconsistency frustrates users. UI optimization needed...",
    "design_goals": "- Improve price transparency throughout checkout\n- Introduce urgency triggers and social proof elements\n- Optimize product list presentation",
    "process": [
      {"step": "01 Problem Discovery", "content": "We used both qualitative and quantitative methods to gather insights..."},
      {"step": "02 Benchmark & Audit", "content": "We benchmarked competitors to study their design patterns..."},
      {"step": "03 Concept & Ideation", "content": "With our goal for the overall purchase flow set, we are now breaking down the solutions..."}
    ],
    "deliverables": "- Redesigned Cart & Checkout flow\n- New promo widget design\n- Product list structure optimization",
    "impact": "- Improved purchase completion rates\n- Better price transparency for users\n- Reduced bounce rate at checkout",
    "takeaways": "- Continuity of promotional messaging is critical\n- Social proof at the right moment drives conversions"
  },
  {
    "slug": "tokopedia-personalized-homepage",
    "title": "Personalized Homepage — Tokopedia",
    "tags": ["Mobile", "Product", "UX Research"],
    "role": "Product Designer",
    "year": "2023",
    "featured": false,
    "context": "Led the redesign of Tokopedia's homepage to improve personalization and user engagement...",
    "background": "Users were seeing generic content that didn't reflect their shopping behavior...",
    "problem": "Low engagement with homepage content due to lack of personalization...",
    "design_goals": "- Create a more personalized homepage experience\n- Increase user engagement with homepage sections",
    "process": [
      {"step": "01 Research", "content": "Conducted user interviews and analyzed behavioral data..."},
      {"step": "02 Ideation", "content": "Brainstormed personalization approaches with product and engineering..."}
    ],
    "deliverables": "- Redesigned homepage with personalized sections\n- Personalization framework documentation",
    "impact": "- Increased homepage engagement by X%\n- Improved click-through rates on personalized sections",
    "takeaways": "- Personalization must balance relevance with diversity"
  },
  {
    "slug": "astro-groceries",
    "title": "Building Groceries Shopping — ASTRO",
    "tags": ["Mobile", "Product", "Design System"],
    "role": "Design System Lead",
    "year": "2024",
    "featured": false,
    "context": "Designing the first build and Design System for ASTRO's groceries shopping experience...",
    "background": "ASTRO is a new grocery delivery platform requiring a complete design system from scratch...",
    "problem": "Starting from zero — no existing design foundation...",
    "design_goals": "- Build a scalable design system from scratch\n- Create cohesive shopping experience across iOS and Android",
    "process": [
      {"step": "01 Foundation", "content": "Established atomic design principles for the grocery domain..."},
      {"step": "02 Component Library", "content": "Built core components tailored for grocery shopping..."}
    ],
    "deliverables": "- ASTRO Design System v1.0\n- Core component library for mobile grocery",
    "impact": "- Enabled rapid feature development\n- Consistent experience across platforms",
    "takeaways": "- Domain-specific design systems require deep product understanding"
  }
]
```

**Verification:** Select from Supabase shows all 4 projects with correct slugs

---

## Phase 5: Deploy

### Task 18: Initialize Git & Push to GitHub

**Commands:**
```bash
cd ~/evanyudis-portfolio
git init
git add .
git commit -m "feat: initial portfolio project setup"

# Create new repo on GitHub first, then:
git remote add origin https://github.com/evanyudis/evanyudis-portfolio.git
git branch -M main
git push -u origin main
```

---

### Task 19: Deploy to Vercel

**Steps:**
1. Log in to Vercel → "Import Project" → select `evanyudis/evanyudis-portfolio`
2. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

**Verification:** Site live at `evanyudis-portfolio.vercel.app` (or custom domain)

---

### Task 20: Configure Supabase Env Vars in Vercel

**Objective:** Ensure Supabase credentials are set in Vercel project settings

**Steps:**
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy if needed

---

## Verification Checklist

After all tasks:

- [ ] Next.js 15 app runs locally (`npm run dev`)
- [ ] Landing page shows hero + work grid (fetched from Supabase)
- [ ] `/projects/kredivo-design-system` renders full case study
- [ ] All colors grayscale only — no chromatic colors
- [ ] Zero `box-shadow` in any CSS
- [ ] Border radius only `12px` (containers) or `9999px` (interactive)
- [ ] Font weight only 400 or 500
- [ ] Pure white `#ffffff` page background
- [ ] All buttons `px-6 py-2.5` (10px 24px equivalent)
- [ ] Sections `py-section` (88px) or `py-section-lg` (112px)
- [ ] Supabase table has 4 seeded projects
- [ ] Site live on Vercel
