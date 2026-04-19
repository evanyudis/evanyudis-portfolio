# evanyudis-portfolio — SPEC

**Goal:** Sr. Product Designer portfolio for headhunters, freelance clients, fellow designers. Clean, jaimec.co-inspired layout with Ollama grayscale design system.

**Status:** PLANNED — awaiting approval

---

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 (CSS-first, existing) |
| Animation | GSAP — hero only |
| Database | Supabase — project content + images |
| Deployment | Vercel + GitHub auto-deploy |
| Font | System sans-serif (SF Pro on Mac) |

---

## Design System — Ollama Grayscale

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-black` | `#000000` | Headlines, primary links |
| `--color-near-black` | `#262626` | Button text, secondary headings |
| `--color-darkest-surface` | `#090909` | Footer only |
| `--color-white` | `#ffffff` | Page background |
| `--color-snow` | `#fafafa` | Alternate section backgrounds |
| `--color-light-gray` | `#e5e5e5` | Borders, tags, button backgrounds |
| `--color-stone` | `#737373` | Body text |
| `--color-mid-gray` | `#525252` | Emphasized secondary text |
| `--color-silver` | `#a3a3a3` | Tertiary, placeholders |

**Zero chromatic colors. Zero shadows. Zero gradients.**

### Border Radius
- Containers (cards): `12px`
- Buttons, tabs, tags: `9999px` (pill)

### Spacing
- Section padding: `88px` top/bottom
- Container max-width: `1024px`

---

## Page Structure

```
/                    → Landing (Hero + Work + Experience + Footer)
/projects/[slug]     → Case study detail page
```

---

## Section 1: HERO

**Layout:** Full-width, left-aligned content, NO right rail
**Background:** `#fafafa` (snow)
**Animation:** GSAP — staggered fade-in on load

### Content
```
[Name: Evan Yudistira — H3 level, 18px]
[Intro: Sr. Product Designer with 6+ years experience...]
[Currently at: Kredivo (linked)]
[Previously: Tokopedia | TikTok Shop, AdMedika]

[CTA: View Work] [CTA: Get in touch]
```

### Typography Scale
- Name: `text-lg` (18px), weight 500
- Intro: `text-lg`, weight 400, `rgba(20,20,20,0.65)`
- "Currently at" line: `text-base`, `rgba(20,20,20,0.5)`
- CTAs: pill buttons (black + outlined)

---

## Section 2: WORK

**Layout:** 2-column grid (1-col mobile)
**Background:** `#ffffff`
**Section label:** `text-xs font-mono uppercase`, "Selected Projects"

### Project Cards
- Full-bleed hero image as background (covers entire card)
- Dark gradient overlay at bottom
- On hover: border transitions `#e5e5e5` → `#525252`
- Content overlaid on image: title + company + year
- Tags as pill badges
- Links to `/projects/[slug]`
- Filter: `featured=true` only

### Data Source
- Supabase `projects` table
- Supabase `project_images` table (hero + gallery)
- Only `featured=true` rows

---

## Section 3: EXPERIENCE

**Layout:** Clean stacked list, NO right rail
**Background:** `#fafafa` (snow)
**Section label:** `text-xs font-mono uppercase`, "Experience"

### Content — Full-time only
1. **Sr. Product Designer** — Kredivo · Oct 2025 — NOW
2. **Sr. Product Designer** — Tokopedia | TikTok Shop · 2024 — 2025
3. **Product Designer** — Tokopedia | TikTok Shop · 2021 — 2024
4. **Product Designer** — AdMedika by Telkom · 2020 — 2021

### Format
- Role + company left-aligned
- Period badge right-aligned (monospace, pill, `#fafafa` bg)
- Single description line per role
- No dividers/borders between entries

---

## Section 4: PROJECT DETAIL PAGE (`/projects/[slug]`)

### Route
`/projects/[slug]` — dynamic, generates from Supabase slugs

### Layout
1. **Back link** — "← Work"
2. **Hero image** — full-bleed, covers top viewport
3. **Project header** — title, tags, role/team/year
4. **Case study sections** (from Supabase fields):
   - Context
   - Background
   - Problem
   - Design Goals
   - Process (steps from JSONB)
   - Deliverables
   - Impact
   - Takeaways
5. **Image gallery** — from `project_images` table
6. **Back to home CTA**

### Styling
- Case study text: `text-stone` body, `text-black` headings
- Section spacing: `48px` between sections
- Gallery: responsive grid, images clickable for lightbox

---

## Supabase Schema

### `projects` table (existing)
All columns from previous schema preserved.

### `project_images` table (NEW)
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| project_id | uuid | FK → projects.id |
| hero_url | text | Hero image URL (nullable) |
| gallery_urls | text[] | Array of gallery image URLs |
| alt_text | text | Accessibility text |
| order | integer | Display order |
| created_at | timestamptz | Auto |

### Workflow
```
Add project image → INSERT into project_images → linked to project via FK
```

---

## Navigation

- Fixed top, transparent background
- Frosted pill nav (centered)
- Links: Work | Experience
- Contact via `mailto:evanditoevan@gmail.com`

---

## Footer

- Background: `#090909`
- White text
- Links: Email, LinkedIn, GitHub
- Copyright: "© 2026 Evan Yudistira"

---

## Implementation Order

1. Create `project_images` table in Supabase
2. Add hero + gallery images to existing 4 projects
3. Rewrite `globals.css` — keep Ollama tokens, strip unused classes
4. Rewrite `Hero.tsx` — clean left-aligned, no right rail
5. Build `ProjectGrid` + `ProjectCard` with full-bleed images
6. Build `ExperienceList` — stacked clean list
7. Build `/projects/[slug]` page with case study layout
8. Build image gallery component
9. Wire up Supabase queries
10. Build + deploy + test

---

## Open Questions

- [x] Hero: Name as headline (confirmed)
- [x] Right rail: NO (confirmed)
- [x] Work images: full-bleed background (confirmed)
- [x] Featured filter: yes (confirmed)
- [x] Experience: full-time only (4 roles, confirmed)
- [x] GSAP: hero only (confirmed)
- [x] Project images: B — hero + gallery (confirmed)

**Pending:**
- Image assets: where to host? (Supabase Storage? External URLs?)
