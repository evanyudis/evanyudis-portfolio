# Portfolio Redesign — Ollama Design System

**Goal:** Rebuild evanyudis portfolio using Next.js 16 + Tailwind v4 with Ollama's radical minimalism design language.

**Status:** Approved

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Deployment:** Vercel + GitHub Pages (dual deploy)
- **Database:** Supabase (PostgreSQL) — projects content management
- **CMS Workflow:** Add/update/delete project entries via Hermes → Supabase → auto-generated static/dynamic pages

## Content Management Architecture

### Supabase Schema

**Table: `projects`**

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | text | URL slug (unique) — e.g., `kredivo-design-system` |
| title | text | Project title — e.g., `Flex Design System — Kredivo` |
| tags | text[] | Array — e.g., `["Mobile", "Product", "Design System"]` |
| role | text | My role in the project |
| team | text | Team composition |
| year | text | Year range — e.g., `2025` |
| context | text | Case study context section (markdown) |
| background | text | Background section (markdown) |
| problem | text | Problem statement (markdown) |
| design_goals | text | Design goals (markdown) |
| process | jsonb | Design process steps — array of `{step: string, content: text}` |
| deliverables | text | Final deliverables (markdown) |
| impact | text | Impact & outcomes (markdown) |
| takeaways | text | Key takeaways (markdown) |
| featured | boolean | Show on landing page work grid |
| created_at | timestamptz | Auto-set on insert |
| updated_at | timestamptz | Auto-updated on update |

### Content Workflow

```
User (Telegram/Hermes)
    ↓ "Add new project X"
Hermes (Supabase skill)
    ↓ INSERT into projects table
Supabase
    ↓ Row inserted with slug
Next.js ISR/SSR
    ↓ Revalidates /projects/[slug]
Vercel
    ↓ New page available at /projects/new-slug
```

---

## Design System — Ollama-Inspired

Reference: `/tmp/DESIGN.md` (generated via `npx getdesign@latest add ollama`)

### Color Palette (Grayscale Only)

| Token | Hex | Usage |
|-------|-----|-------|
| Pure Black | `#000000` | Headlines, primary links |
| Near Black | `#262626` | Button text on light surfaces |
| Darkest Surface | `#090909` | Footer, dark containers |
| Pure White | `#ffffff` | Page background |
| Snow | `#fafafa` | Section backgrounds |
| Light Gray | `#e5e5e5` | Button backgrounds, borders |
| Stone | `#737373` | Secondary body text |
| Mid Gray | `#525252` | Emphasized secondary text |
| Silver | `#a3a3a3` | Tertiary text, placeholders |
| Button Text Dark | `#404040` | White-surface button text |
| Border Light | `#d4d4d4` | White-surface button borders |
| Ring Blue | `#3b82f6` 50% | Keyboard focus ring only |

**No chromatic colors. No gradients. Zero shadows.**

### Typography

- **Display/Headings:** `SF Pro Rounded`, weight 500, tight line-height
- **Body/UI:** System sans-serif stack
- **Code/Monospace:** System monospace stack

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Display / Hero | 48px | 500 | 1.0 |
| Section Heading | 36px | 500 | 1.11 |
| Sub-heading | 30px | 400–500 | 1.20 |
| Card Title | 24px | 400 | 1.33 |
| Body Large | 18px | 400–500 | 1.56 |
| Body / Link | 16px | 400–500 | 1.50 |
| Caption | 14px | 400 | 1.43 |
| Small | 12px | 400 | 1.33 |

### Border Radius — Binary System

- **Containers (cards, code blocks, panels):** `12px`
- **Interactive (buttons, tabs, inputs, tags):** `9999px` (pill-shaped)

**Nothing in between.**

### Spacing Scale

Base: 8px. Section vertical: `88px–112px`. Button padding: `10px 24px`.

---

## Page Structure

### Routes

```
/                        → Landing (Hero + Work + Experience)
/projects/[slug]         → Case study detail
```

### Landing Page Sections

1. **Hero** — centered, pure white, 48px headline, intro text, CTA buttons
2. **Work** — 2-col grid of project cards (featured only)
3. **Experience** — timeline-style role list
4. **Footer** — #090909 dark, minimal links

### Project Detail Page

1. Back link ("← Work")
2. Project header (title, tags, role/team/year)
3. Case study sections: Context, Background, Problem, Goals, Process, Deliverables, Impact, Takeaways
4. Back to home CTA

---

## Implementation Phases

1. Setup: Next.js + Tailwind + Supabase client
2. Design System: tokens + components
3. Pages: landing + /projects/[slug]
4. Content: seed Supabase
5. Deploy: Vercel + GitHub Pages
