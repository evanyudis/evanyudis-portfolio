# Portfolio Redesign — Ollama Design System

**Goal:** Rebuild evanyudis portfolio using Next.js 15 + Tailwind v4 with Ollama's radical minimalism design language.

**Status:** Draft — pending user review

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Deployment:** Vercel (inferred from Next.js ecosystem)
- **Content:** Hardcoded from scraped evanyudis.framer.ai content

---

## Design System — Ollama-Inspired

Reference: `/tmp/DESIGN.md` (generated via `npx getdesign@latest add ollama`)

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Pure Black | `#000000` | Headlines, primary links |
| Near Black | `#262626` | Button text on light surfaces |
| Darkest Surface | `#090909` | Footer, dark containers |
| Pure White | `#ffffff` | Page background |
| Snow | `#fafafa` | Section backgrounds, elevated containers |
| Light Gray | `#e5e5e5` | Button backgrounds, borders |
| Stone | `#737373` | Secondary body text, footer links |
| Mid Gray | `#525252` | Emphasized secondary text |
| Silver | `#a3a3a3` | Tertiary text, placeholders |
| Button Text Dark | `#404040` | White-surface button text |
| Border Light | `#d4d4d4` | White-surface button borders |
| Ring Blue | `#3b82f6` 50% | Keyboard focus ring only |

**No chromatic colors. No gradients. Zero shadows.**

### Typography

- **Display/Headings:** `SF Pro Rounded`, weight 500, tight line-height
- **Body/UI:** System sans-serif stack (`system-ui, -apple-system, ...`)
- **Code/Monospace:** `ui-monospace` stack

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
- **Interactive (buttons, tabs, inputs, tags, badges):** `9999px` (pill-shaped)

**Nothing in between.**

### Spacing Scale

Base: 8px. Scale: `4, 6, 8, 9, 10, 12, 14, 16, 20, 24, 32, 40, 48, 88, 112px`

- Section vertical spacing: `88px–112px`
- Card internal padding: `24–32px`
- Button padding: `10px 24px` (consistent across all buttons)

### Depth — Zero Shadows

| Level | Treatment |
|-------|-----------|
| Flat | No shadow, no border — page background |
| Bordered | `1px solid #e5e5e5` — cards, buttons, code blocks |

Depth comes from background color shifts and 1px borders only.

---

## Page Structure

### Routes

```
/                        → Landing (Hero + Work + Experience)
/projects/[slug]         → Case study detail
```

Optional: `/about` merged into landing.

### Landing Page (`/`)

```
[Hero Section]
- "26' Portfolio" or "Evan"
- Intro text: "Hey, I'm Evan a sr. product designer at Kredivo based in Jakarta..."
- Email copy action ("Press c to copy my email")
- No illustration, no background color blocks — pure white

[Work Section]
- "Selected Projects" heading
- Grid of project cards (2-col desktop, 1-col mobile)
- Each card links to /projects/[slug]

[Experience Section]
- "Experience" heading
- Timeline-style or list of roles (Kredivo, Tokopedia, etc.)
- Clean, minimal — no decorative elements

[Education Section]
- Bachelor of CS — Brawijaya University

[Contact/Footer]
- Email + LinkedIn links
- Pure white or #090909 footer
```

### Project Detail Page (`/projects/[slug]`)

```
[Back link]
- "← Work" or "← Back" — pill-shaped link

[Project Header]
- Project title (e.g., "Flex Design System — Kredivo")
- Tags (Mobile, Product, Design System)
- Team, Role, Year

[Case Study Body]
- Context / Background / Problem
- Design Goals
- Design Process sections (numbered)
- Final Deliverables
- Impact & Outcomes
- Key Takeaways

[Next Project Navigation]
- Link to next project
```

---

## Components

### Button — Pill Variants

**Black Pill (CTA)**
- Background: `#000000`, Text: `#ffffff`, Radius: `9999px`
- Padding: `10px 24px`

**Gray Pill (Primary)**
- Background: `#e5e5e5`, Text: `#262626`, Radius: `9999px`
- Border: `1px solid #e5e5e5`

**White Pill (Secondary)**
- Background: `#ffffff`, Text: `#404040`, Radius: `9999px`
- Border: `1px solid #d4d4d4`

### Card — Container

- Background: `#ffffff` or `#fafafa`
- Border: `1px solid #e5e5e5`
- Radius: `12px`
- Padding: `24–32px`
- No shadow

### Tag / Badge

- Background: `#e5e5e5`, Text: `#262626`
- Radius: `9999px` (pill)
- Small padding: `4px 12px`
- Font: 12px or 14px

### Input

- Background: `#ffffff`
- Border: `1px solid #e5e5e5`
- Radius: `9999px` (pill-shaped)
- Focus: Ring Blue `#3b82f6` 50%
- Placeholder: `#a3a3e5e5`

### Navigation

- Transparent background, no border
- Logo/wordmark left, links center/right
- Text links in `#000000` at 16px weight 400
- CTA button: Black Pill

---

## Layout

### Desktop (≥1024px)

- Max container: `1024px` centered
- Hero: centered single column
- Work grid: 2 columns
- Experience: 1 column with role dividers

### Tablet (768–1024px)

- 2-col layouts collapse to adjusted spacing
- Reduced section padding

### Mobile (<768px)

- Single column throughout
- Navigation collapses (hamburger or simplified)
- Font sizes scale down: 48px → 36px → 30px

---

## Implementation Approach

**Page-by-page rebuild (Option A):**

1. Setup Next.js 15 + Tailwind v4 project
2. Define Ollama design tokens in Tailwind config
3. Build shared components (Button, Card, Tag, Section)
4. Implement `/` landing page
5. Implement `/projects/[slug]` dynamic route
6. Add case study content (Kredivo DS, Tokopedia Checkout)
7. Deploy to Vercel

---

## Verification

- [ ] All colors grayscale only — run grep for hex color codes outside `#000000`–`#ffffff` range
- [ ] Zero box-shadows in CSS — grep for `shadow`
- [ ] Border radius only `12px` (containers) or `9999px` (interactive) — no intermediate values
- [ ] Font weight only 400 or 500
- [ ] Pure white page background
- [ ] All buttons 10px 24px padding
- [ ] Sections 88px+ vertical spacing
