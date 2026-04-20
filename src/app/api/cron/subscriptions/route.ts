import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Use service role key for cron jobs to bypass RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  // Verify cron secret for security
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date().toISOString();

    // Fetch all active subscriptions due for cron
    const { data: subscriptions, error: fetchError } = await supabase
      .from('subscription_crons')
      .select('*')
      .eq('is_active', true)
      .lte('next_cron_at', now);

    if (fetchError) {
      console.error('Error fetching subscriptions:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 });
    }

    const results = [];

    for (const subscription of subscriptions ?? []) {
      try {
        // Calculate next cron date based on interval
        const nextCronDate = new Date(subscription.next_cron_at);
        if (subscription.interval_type === 'monthly') {
          nextCronDate.setMonth(nextCronDate.getMonth() + 1);
        } else {
          nextCronDate.setFullYear(nextCronDate.getFullYear() + 1);
        }

        // Update subscription with new cron date
        const { error: updateError } = await supabase
          .from('subscription_crons')
          .update({
            last_cron_at: now,
            next_cron_at: nextCronDate.toISOString(),
            updated_at: now,
          })
          .eq('id', subscription.id);

        if (updateError) {
          console.error(`Error updating subscription ${subscription.id}:`, updateError);
          results.push({
            id: subscription.id,
            email: subscription.email,
            status: 'error',
            error: updateError.message,
          });
        } else {
          // TODO: Add your subscription logic here (e.g., send email, update Stripe, etc.)
          console.log(`Processed subscription for ${subscription.email}, next cron at ${nextCronDate.toISOString()}`);
          
          results.push({
            id: subscription.id,
            email: subscription.email,
            status: 'success',
            next_cron_at: nextCronDate.toISOString(),
          });
        }
      } catch (err) {
        console.error(`Error processing subscription ${subscription.id}:`, err);
        results.push({
          id: subscription.id,
          email: subscription.email,
          status: 'error',
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      processed: results.length,
      results,
      timestamp: now,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
