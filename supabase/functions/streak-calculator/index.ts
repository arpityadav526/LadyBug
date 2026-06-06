/**
 * Streak Calculator Edge Function (Cron Job)
 *
 * Designed to run daily via Supabase's pg_cron or an external
 * scheduler. Iterates through all users, checks if they had a
 * study session yesterday, and either increments or resets their streak.
 *
 * Schedule: Every day at 00:05 UTC
 * Invoke:   POST /functions/v1/streak-calculator (with service role key)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Fetch all user progress records
    const { data: allProgress, error: progressError } = await supabaseAdmin
      .from('user_progress')
      .select('user_id, current_streak_days, longest_streak_days');

    if (progressError) throw progressError;
    if (!allProgress) {
      return new Response(JSON.stringify({ message: 'No users found' }), { status: 200 });
    }

    let updated = 0;
    let reset = 0;

    for (const progress of allProgress) {
      // Check if user had a session yesterday
      const { count } = await supabaseAdmin
        .from('study_sessions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', progress.user_id)
        .eq('session_date', yesterdayStr);

      if ((count ?? 0) > 0) {
        // Increment streak
        const newStreak = progress.current_streak_days + 1;
        const newLongest = Math.max(newStreak, progress.longest_streak_days);

        await supabaseAdmin
          .from('user_progress')
          .update({
            current_streak_days: newStreak,
            longest_streak_days: newLongest,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', progress.user_id);

        updated++;
      } else {
        // Reset streak (user missed yesterday)
        if (progress.current_streak_days > 0) {
          await supabaseAdmin
            .from('user_progress')
            .update({
              current_streak_days: 0,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', progress.user_id);

          // Notify the user
          await supabaseAdmin.from('notifications').insert({
            user_id: progress.user_id,
            title: '😔 Streak Lost',
            body: `Your ${progress.current_streak_days}-day streak has been reset. Start a new one today!`,
          });

          reset++;
        }
      }
    }

    return new Response(
      JSON.stringify({ message: `Streaks processed. Updated: ${updated}, Reset: ${reset}` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
