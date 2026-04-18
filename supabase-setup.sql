-- ============================================================
-- SUPABASE DASHBOARD → SQL Editor → Run this entire block
-- ============================================================

-- Step 1: Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
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

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public read" ON public.projects;
DROP POLICY IF EXISTS "Allow all" ON public.projects;

-- Create policies
CREATE POLICY "Allow public read" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow all" ON public.projects FOR ALL USING (true) WITH CHECK (true);

-- Step 2: Seed 4 projects
INSERT INTO public.projects (slug, title, tags, role, team, year, featured, context, background, problem, design_goals, process, deliverables, impact, takeaways)
VALUES

(
  'kredivo-design-system',
  'Flex Design System — Kredivo',
  ARRAY['Mobile', 'Product', 'Design System'],
  'Concept, UI/UX Design, Design System',
  'Product Designers, Engineers, Product Managers',
  '2025',
  true,
  'As a Senior Product Designer at Kredivo, I was assigned as the sole Design PIC to establish a scalable Design System that could support multiple product teams and increasing product complexity. This initiative focused on building a single source of truth for design—enabling consistency, efficiency, and long-term scalability across Kredivo''s products.',
  'When I first joined, Kredivo already had a "Design System" file in Figma. However, in practice, it functioned primarily as a component collection, not a true system. There was no clear hierarchy, ownership, or usage rules. Components were created independently by each designer, leading to widespread duplication and visual inconsistencies. As the product continued to scale, this approach introduced significant design debt and slowed down iteration.',
  'As Kredivo''s product ecosystem grew, the absence of a scalable design foundation resulted in increasing inefficiency, inconsistency, and long-term maintenance risks—making it difficult to sustain both quality and velocity.',
  '- Establish a scalable Design System based on Atomic Design
- Define a clear set of core components
- Provide explicit rules for structure, behavior, and usage
- Reduce duplication and improve consistency across products
- Enable faster and more effective design decisions',
  '[{"step":"01 Design System Audit","content":"I began by conducting a comprehensive audit of the existing Design System file. This included reviewing all components, identifying overlapping patterns, and mapping areas of duplication and inconsistency. The audit revealed that incremental cleanup would not be sufficient. A full restructuring was required to support scalability.\n\nTwo main issues uncovered:\n- No Single Source of Truth — The existing Design System file functioned as a shared storage rather than a centralized system.\n- Lack of System Structure & Rules — Without explicit structure and guidance, design decisions relied heavily on individual interpretation."},{"step":"02 Defining the System Concept","content":"Based on the audit findings, I introduced a system-first approach grounded in Atomic Design principles.\n\nThe system was designed to clearly separate:\n- Core Component\n- Composite Component\n- Product-specific implementations\n\nAt this stage, the Design System was named Flex — reflecting a flexible and modular foundation built to support evolving product needs."},{"step":"03 Component Classification & Prioritization","content":"Rather than building everything at once, I prioritized components that:\n- Were used most frequently across products\n- Had the highest impact on visual consistency\n- Carried the greatest risk if left unstandardized\n\nThis resulted in a focused set of core components that formed the backbone of Flex and guided future expansion."},{"step":"04 Component Construction","content":"Each core component was built with a consistent standard:\n- Clearly defined anatomy — Each component was broken down into explicit structural parts\n- Explicit interaction states and behaviors\n- Scalable and maintainable variant structures\n- Usage rules and constraints"}]',
  '- Flex Design System — A centralized and structured design system file that serves as the single source of truth
- Core Component Library — A curated set of reusable core components
- Anatomy & Behavior Definition — Clear documentation outlining each component''s structure, states, and interaction behavior
- Design Guidelines',
  'Business Impact:\n- Faster design iteration and reduced time-to-market\n- Lower design and engineering rework through standardized components\n- Reduced long-term maintenance cost as the system scaled\n- Improved product consistency, strengthening brand trust\n\nTeam Scalability:\n- Faster onboarding for new designers\n- Shared design language across teams\n- Design quality scaled with team growth instead of degrading\n\nDesign Effectiveness:\n- Designers focused more on problem-solving rather than recreating UI\n- Shorter and more predictable design review cycles\n- Clearer decision-making through well-defined system rules',
  '- A Design System is a product, not just a component library
- Atomic Design provides a strong foundation for scalability
- Lean systems are more sustainable than overly complex ones
- Consistency is driven by clear rules, not visual similarity alone'
),

(
  'tokopedia-checkout',
  'Seamless Purchase Flow — Tokopedia',
  ARRAY['Mobile App iOS/Android', 'Product'],
  'Concept, UI/UX, UX Research, Prototype, Design System',
  'Product Designer, UX Researcher, UX Writer, Product Managers',
  '2024–2025',
  true,
  'Since H2 ''24, I''ve led the design for the entire purchase experience—covering the shopping cart, checkout, and order management. Previously handled by a team of four designers, the module was consolidated under my ownership. I''m responsible for shaping end-to-end flows including coupon usage, logistics, and payment—ensuring a seamless and intuitive journey from cart to order.',
  'Aligning the 2025 vision to signify more on promo affordability (final price after promo, vouchers) and social proofs (user generated content, platform assurance, transactional data) to increase buyer''s buying perspective in Tokopedia, we need to improve this aspect on end-to-end UX in buyer facing. The goal is that buyers will be more convinced to make purchase decisions after looking at promo affordability and multiple social proofs in Cart & Checkout.',
  'Lack of continuity & transparency — Insufficient valuable promotions, and inconsistency frustrates users. UI optimization needed — Improving current interface, layout, and visual hierarchy of the purchase experience.',
  '- Improve price transparency throughout checkout
- Introduce urgency triggers and social proof elements
- Optimize product list presentation
- Create a unified visual system with consistent promotion highlighting throughout the checkout flow',
  '[{"step":"01 Problem Discovery","content":"We used both qualitative and quantitative methods to gather insights and data.\n\nUser''s perception:\n- Tokopedia cart & checkout offers a straightforward experience but fails to engage users enough to complete purchases immediately.\n- Tokopedia lacks sufficient valuable promotions that would motivate buyers to engage and make purchases.\n\nUsers'' pain points:\n- Users encounter unexpected price differences between the cart and checkout pages due to additional costs like shipping and insurance.\n- Users are frustrated when promotions shown on home and product detail pages disappear after the products are added to the cart.\n\nResearch objective: What are the information that our users need in order to see product they added in their cart that influence their decision to checkout the product."},{"step":"02 Benchmark & Audit","content":"We benchmarked competitors to study their design patterns especially how they implement promotions, information presentation, and visual styles.\n\nImproving price presentation:\n- Current issue: The cart total amount only shows the final price without any detail information of the calculation.\n- Recommendation: Provide the price calculation for better transparency, this fasten user decision to checkout and reducing bounce rate.\n\nEnhance product list presentation:\n- Current issue: In the above the fold, current design of cart page can only show 3 products–takes up vertical space too much.\n- Recommendation: Restructuring the overall product showcase by showing the most important information."},{"step":"03 Concept & Ideation","content":"With our goal for the overall purchase flow (cart and checkout) set, we are now breaking down the solutions from concept to implementation.\n\nSense of Affordability: Create a unified visual system with consistent promotion highlighted throughout the checkout flow.\n\nUrgency & social proof information: Introduce urgency triggers and social proof elements designed to drive faster purchase decisions — stock scarcity, social proof.\n\nCoupon upselling: Introduce real-time upsell indicators and progress bars in the cart, along with contextual product suggestions.\n\nProduct list new structure: We optimized the layout by merging key elements, resizing details, and reducing vertical space for a cleaner look."}]',
  '- Redesigned Cart & Checkout flow
- New promo widget design with benefit amount highlighting
- Product list structure optimization
- Detailed transaction summary with all benefits shown',
  '- Improved purchase completion rates through better price transparency
- Reduced bounce rate at checkout
- Better user confidence in purchase decisions through social proof and urgency triggers
- Clearer communication of promotional benefits',
  '- Continuity of promotional messaging is critical — don''t let promotions disappear at checkout
- Social proof at the right moment drives conversions
- Price transparency reduces purchase friction significantly'
),

(
  'tokopedia-personalized-homepage',
  'Personalized Homepage — Tokopedia',
  ARRAY['Mobile', 'Product', 'UX Research'],
  'Product Designer',
  'Product Designer, UX Researcher, Product Managers',
  '2023',
  true,
  'Led the redesign of Tokopedia''s homepage to improve personalization and user engagement through data-driven design decisions.',
  'Users were seeing generic content that didn''t reflect their shopping behavior, leading to low engagement with homepage sections.',
  'Low engagement with homepage content due to lack of personalization and irrelevant product recommendations.',
  '- Create a more personalized homepage experience
- Increase user engagement with homepage sections
- Improve click-through rates on featured content',
  '[{"step":"01 Research & Audit","content":"Conducted user interviews and analyzed behavioral data to understand how users interact with the current homepage layout."},{"step":"02 Ideation","content":"Brainstormed personalization approaches with product and engineering teams to define the personalization framework."},{"step":"03 Prototyping & Testing","content":"Built prototypes and conducted usability testing to validate personalization concepts with real users."}]',
  '- Redesigned homepage with personalized sections
- Personalization framework documentation
- Design guidelines for future homepage iterations',
  '- Increased homepage engagement through relevant content
- Improved click-through rates on personalized sections',
  '- Personalization must balance relevance with content diversity
- Too narrow personalization can create filter bubbles'
),

(
  'astro-groceries',
  'Building Groceries Shopping — ASTRO',
  ARRAY['Mobile App', 'Product', 'Design System'],
  'Freelance Product Designer',
  'Freelance (Solo)',
  '2021',
  true,
  'ASTRO is a grocery delivery app that needed a complete design system and end-to-end buyer journey before launch. As the sole freelance designer, I was brought in to build the design foundation from zero — covering component library, documentation, and the full user flow from onboarding to order completion.',
  'ASTRO was launching in the competitive quick commerce space, competing against established players. Unlike typical bootstrap startups, they had solid funding but no in-house design capability. They needed someone to establish the entire design foundation quickly — without sacrificing quality or scalability.',
  'Launch timeline was tight and there was no existing design infrastructure. The team needed a complete, scalable design system and a proven buyer journey that could support rapid iteration post-launch.',
  '- Build a complete design system from zero
- Design an intuitive end-to-end buyer journey
- Create a scalable foundation for future product expansion
- Deliver clear documentation for the engineering team',
  '[{"step":"01 Discovery & Research","content":"Conducted competitive analysis of existing grocery delivery apps (GoMart, Sayurbox, etc.) to understand common patterns and identify differentiation opportunities. Mapped the core buyer journey stages and defined the minimum viable product scope."},{"step":"02 Design System Foundation","content":"Built the design system from the ground up — design tokens, core components, and interaction patterns. Focused on creating a flexible, scalable foundation rather than hardcoding specific UI decisions. Documented component usage rules for engineering handoff."},{"step":"03 Buyer Journey Mapping","content":"Designed the end-to-end user flow: onboarding, product discovery, cart management, checkout, order tracking, and post-delivery. Prioritized clarity and speed — grocery users are task-focused and won''t tolerate friction."},{"step":"04 Prototype & Validation","content":"Built interactive prototypes for the core purchase flow. Conducted informal usability testing with potential users to validate the flow before finalizing designs for engineering handoff."}]',
  '- Complete design system (tokens, components, documentation)
- End-to-end buyer journey wireframes and high-fidelity screens
- Prototype for core purchase flow
- Design handoff documentation for engineering team',
  '- Enabled successful app launch within the target timeline
- Provided scalable design foundation for post-launch iteration
- Clear component library reduced design-engineering miscommunication',
  '- Starting with a design system before product complexity grows saves significant rework later
- Freelance engagements require clear scope management — build for launch, not for the ideal system
- Buyer journey clarity matters more than feature richness in grocery apps'
)

ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tags = EXCLUDED.tags,
  role = EXCLUDED.role,
  team = EXCLUDED.team,
  year = EXCLUDED.year,
  featured = EXCLUDED.featured,
  context = EXCLUDED.context,
  background = EXCLUDED.background,
  problem = EXCLUDED.problem,
  design_goals = EXCLUDED.design_goals,
  process = EXCLUDED.process,
  deliverables = EXCLUDED.deliverables,
  impact = EXCLUDED.impact,
  takeaways = EXCLUDED.takeaways,
  updated_at = now();
