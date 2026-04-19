# Evan Yudistira Portfolio — Redesign Spec
**Merge:** Ollama design system (grayscale, SF Pro Rounded, pill geometry) + Jaber Elferkh layout (Toolkit tabs, horizontal experience, "Other topics" secondary projects)

---

## 1. Concept & Vision

A senior product designer's portfolio that reads like a well-crafted design artifact — not a template. The Ollama grayscale system creates a quiet, confident canvas where the work speaks. Jaber's layout structure adds dimensionality: a Toolkit section that signals craft, an experience section with editorial clarity, and a secondary "Topics" row for writing, speaking, and freelance work.

**Aesthetic**: Radical grayscale minimalism with warmth. Paper-like surfaces, pill geometry, generous whitespace. The kind of portfolio that makes you trust the designer before they show you a single project.

---

## 2. Design Language

### Palette (Ollama Grayscale — unchanged)
| Role | Hex | Usage |
|------|-----|-------|
| Pure Black | `#000000` | Primary headlines, links |
| Near Black | `#262626` | Secondary headings, button text |
| Darkest Surface | `#090909` | Dark footer only |
| Pure White | `#ffffff` | Page background |
| Snow | `#fafafa` | Alternate section backgrounds |
| Light Gray | `#e5e5e5` | Button backgrounds, borders, tags |
| Stone | `#737373` | Body text, muted content |
| Mid Gray | `#525252` | Emphasis secondary |
| Silver | `#a3a3a3` | Placeholders, metadata |
| Button Dark | `#404040` | White button text |

### Hero Layout (jaimec.co style — LEFT-ALIGNED, not centered)
**Reference:** https://jaimec.co/

**Structure:**
- Single column, left-aligned (NOT centered)
- Frosted pill nav centered at top
- Name as H3: Geist 18px, weight 500, near-black (`#141414`)
- Intro line below: Geist 18px, weight 400, stone gray (`rgba(20,20,20,0.6)`) — inline with name on same visual block
- "Currently designing at [Company]" as normal text line below intro
- No GSAP animation — keep it simple/static
- Optional: rotated sticky note with contact info (yellow bg, 12px radius, box-shadow)
- Background: off-white `#fafafa`

**Font:** Geist (with fallback to system-ui, -apple-system)

**Content (from wiki/LinkedIn):**
- Name: "Evan Yudistira"
- Intro: "Sr. Product Designer with 6+ years experience designing scalable products and design systems."
- Currently at: [Kredivo](https://www.kredivo.id) — link
- Previously: Tokopedia | TikTok Shop, AdMedika

### Typography
- **Display/Headings**: `system-ui` (Apple SF Pro Rounded on Mac), weight 500, tight line-height (1.0–1.1)
- **Body**: System UI stack, weight 400, comfortable line-height (1.5–1.6)
- **Labels/Meta**: Small monospace (`ui-monospace`) for section labels, periods — subtle developer identity
- **Scale**: Display 48px → Section H2 36px → Card H3 24px → Body 16px → Caption 14px → Small 12px

### Spatial System
- Base unit: 8px
- Section vertical padding: 88px top/bottom
- Container max-width: 1024px
- Card padding: 24px
- Component gap: 24px
- Grid gap: 16px

### Motion Philosophy
- GSAP animations kept: hero entrance (title → subtitle → actions stagger)
- Micro-interactions: hover on cards (border darkens, no lift), buttons (scale 0.97 on press)
- Scroll reveals: fade + slight translate (opacity 0→1, y 16px→0), 400ms ease-out
- NO bounce, NO spring, NO overshoot — calm and deliberate

### Visual Assets
- No photos in hero (keep text-only, confident)
- Project cards: minimal — title, company, year, tag pills. No screenshots in grid.
- Tool icons: Simple monochrome SVG icons in pill badges (not colored brand logos)
- GitHub contributions heatmap (keep from current site)

---

## 3. Layout & Structure

### Page Flow (top to bottom)
```
[Navigation]          ← transparent, sticky-ish, name left, links right
[Hero]                ← centered, name as display heading, intro + 2 CTAs
[GitHub Heatmap]      ← minimal strip, contribution graph
[Work]                ← "Selected Projects" — 2-col card grid, featured from Supabase
[Other Topics]        ← "Beyond work" — writing, speaking, freelance, mentorship
[Experience]          ← Clean horizontal timeline, company/role left, period right
[My Toolkit]          ← Tabbed pills: Design | Dev | Workflow | AI → tool pills
[Education]           ← Single bordered card, minimal
[Footer]              ← Dark (#090909), centered, copyright + links
```

### Navigation
- Transparent background, no border
- Left: "Evan" or "Evan Yudistira" as home link
- Right: Work | Experience | Toolkit | Contact (pill-style links on hover)
- No hamburger on mobile — links collapse to icon row

### Hero
- Centered single column
- Display: "Evan Yudistira" or "Evan Yudistira — Sr. Product Designer" as H1
- Body: Short 2-line intro
- CTAs: "View Work" (black pill) + "Download CV" (gray pill)
- GSAP entrance animation

### Work Section
- 2-column responsive grid (1-col mobile)
- Cards: bordered (1px light-gray), 12px radius, hover border darkens
- Content: tag pills → title → company + year
- Data from Supabase (keep existing)

### Other Topics (NEW)
- "Beyond work" heading
- 4-col pill/tag layout (wrapping) showing: Writing (blog posts), Speaking, Freelance projects, Mentorship
- Each item: small pill with label — clicking goes to section or external link
- Inspired by Jaber's "Other topics" row

### Experience (redesign)
- Clean table-like layout: role + company on left column, period badge on right
- No bordered-top dividers
- Monospace font for period badge
- Role in Near Black, company in Stone, period in Silver
- Single monospace label above: "EXPERIENCE" in small caps / monospace

### My Toolkit (NEW — key differentiator)
- Section heading "My Toolkit" + one-line description
- Tab pills: Design | Development | Workflow & Utilities | AI & Assistive
- Active tab: Light Gray bg + Near Black text (pill)
- Inactive tab: transparent + Stone text → hover Light Gray
- Below tabs: Wrapping pill grid of tools
- Each tool pill: icon (monochrome SVG) + name
- Tools list:
  - **Design**: Figma, Framer, Adobe XD, Photoshop, Illustrator, After Effects, Lottie
  - **Development**: HTML/CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, GSAP
  - **Workflow**: Git, GitHub, Notion, Linear, Miro, Figma (dev mode), Storybook
  - **AI & Assistive**: Claude, ChatGPT, Copilot, Midjourney, Runway, Suno

### Education (minimal)
- Single bordered card, no grid
- Degree, institution, location, year
- Research description in Stone

### Footer
- Dark surface (#090909), white text
- Centered: copyright + "Built with Next.js" + social links (Email, LinkedIn, GitHub)

### Responsive
- Breakpoints: 640px (mobile), 768px (tablet), 1024px (desktop)
- Nav: 768px+ shows full links, below shows minimal
- Work grid: 768px+ 2-col, below 1-col
- Toolkit grid: responsive wrapping

---

## 4. Features & Interactions

### Navigation
- Scroll: nav stays transparent, gains subtle bg on scroll (optional, keep simple)
- Links smooth-scroll to sections

### Work Cards
- Hover: border transitions from `#e5e5e5` → `#525252`, no shadow, no lift
- Click: navigates to `/projects/[slug]`
- Loading: "Loading..." text in Stone

### Toolkit Tabs
- Click: instant switch, no animation (calm)
- Active pill: Light Gray bg
- Scrollable horizontally on mobile

### Experience
- Static display, no interaction
- Clean left-aligned table layout

### Contact
- Email link in footer
- Optional: simple mailto link

---

## 5. Component Inventory

### `<Navigation />`
- States: default (transparent), scrolled (white bg + border)
- Links: pill-hover effect

### `<Hero />`
- GSAP timeline: title → subtitle → CTAs (staggered)
- 2 CTA buttons

### `<GitHubHeatmap />`
- Static component showing contribution graph
- Uses GitHub-style colored squares (grayscale: white=0, dark gray=contributions)

### `<ProjectGrid />`
- 2-col grid, fetches from Supabase
- Empty state: "No projects found."
- Loading state: "Loading..."

### `<ProjectCard />`
- States: default (light border), hover (mid border)
- Contains: Tag pills, title, meta line

### `<OtherTopics />`
- Wrapping pill grid
- Categories: Writing, Speaking, Freelance, Mentorship
- Each pill: label text + arrow or external link icon

### `<ExperienceList />`
- Clean table layout
- Each row: role/company left, period right
- Section label in monospace above

### `<ToolkitSection />`
- Tab bar + tool pill grid
- States per tab: active (gray fill), inactive (transparent), hover (light gray)
- Tool pills: icon + name, 12px radius or pill

### `<Education />`
- Single bordered card

### `<Footer />`
- Dark bg (#090909)
- Centered text links

---

## 6. Technical Approach

### Stack
- **Framework**: Next.js 16.2.4 (App Router)
- **Styling**: Tailwind CSS v4 (CSS-first config in `globals.css`)
- **Animation**: GSAP + @gsap/react (existing)
- **Database**: Supabase (existing, for project data)
- **Deployment**: Vercel (existing)

### Architecture
- Single page (`src/app/page.tsx`) with sections
- Components in `src/components/`
- Supabase data fetching stays in `ProjectGrid`
- New components: `OtherTopics.tsx`, `ToolkitSection.tsx`, `GitHubHeatmap.tsx`
- `ExperienceList.tsx` redesigned in-place

### Key Files to Modify
1. `src/app/globals.css` — add toolkit/Education styles
2. `src/app/page.tsx` — add OtherTopics + ToolkitSection sections
3. `src/components/Hero.tsx` — update to new hero layout
4. `src/components/ExperienceList.tsx` — redesign to horizontal layout
5. `src/components/Navigation.tsx` — update link labels
6. `src/components/ProjectGrid.tsx` — add ProjectCard component (inline or separate)
7. New: `src/components/OtherTopics.tsx`
8. New: `src/components/ToolkitSection.tsx`
9. New: `src/components/GitHubHeatmap.tsx` (if keeping heatmap)

### Implementation Order
1. globals.css — verify/update design tokens
2. page.tsx — restructure sections
3. Hero.tsx — update text
4. ExperienceList.tsx — new layout
5. OtherTopics.tsx — new component
6. ToolkitSection.tsx — new component
7. Navigation.tsx — update links
8. Footer update in page.tsx
9. GitHubHeatmap (optional)
10. Dev server test
