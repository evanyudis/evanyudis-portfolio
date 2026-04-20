-- ============================================================
-- Create subscription_crons table
-- ============================================================

CREATE TABLE IF NOT EXISTS public.subscription_crons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  subscription_tier TEXT DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  interval_type TEXT DEFAULT 'monthly', -- 'monthly' or 'yearly'
  next_cron_at TIMESTAMPTZ NOT NULL,
  last_cron_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.subscription_crons ENABLE ROW LEVEL SECURITY;

-- Allow public read (for checking subscription status)
CREATE POLICY "Allow public read subscription_crons" ON public.subscription_crons
  FOR SELECT USING (true);

-- Allow all authenticated operations (Hermes uses service role key)
CREATE POLICY "Allow all subscription_crons" ON public.subscription_crons
  FOR ALL USING (true) WITH CHECK (true);

-- Create index for efficient querying of active crons
CREATE INDEX idx_subscription_crons_next_cron_at 
  ON public.subscription_crons (next_cron_at) 
  WHERE is_active = true;

-- Create index for user lookup
CREATE INDEX idx_subscription_crons_user_id 
  ON public.subscription_crons (user_id);
