-- ============================================================
-- SUPABASE DASHBOARD → SQL Editor → Run this
-- ============================================================

-- Create projects table
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

-- Allow public read
CREATE POLICY "Allow public read" ON public.projects
  FOR SELECT USING (true);

-- Allow all authenticated operations (Hermes uses service role key)
CREATE POLICY "Allow all" ON public.projects
  FOR ALL USING (true) WITH CHECK (true);
