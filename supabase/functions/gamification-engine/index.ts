/**
 * Gamification Engine Edge Function
 *
 * Called after a study session is logged. Checks if the user
 * qualifies for any new badges and awards them.
 *
 * Note: XP calculation is handled by a Postgres trigger
 * (award_xp_on_session) for instant feedback. This function
 * handles the more complex badge-awarding logic.
 *
 * Invoke: POST /functions/v1/gamification-engine
 * Body:   { "user_id": "uuid" }
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();
    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    // Fetch user stats
    const [progressRes, sessionsCountRes, tasksCountRes, earnedBadgesRes] = await Promise.all([
      supabaseAdmin.from('user_progress').select('*').eq('user_id', user_id).single(),
      supabaseAdmin.from('study_sessions').select('*', { count: 'exact', head: true }).eq('user_id', user_id),
      supabaseAdmin.from('tasks').select('*', { count: 'exact', head: true }).eq('user_id', user_id).eq('is_completed', true),
      supabaseAdmin.from('user_badges').select('badge_id').eq('user_id', user_id),
    ]);

    const progress = progressRes.data;
    const totalSessions = sessionsCountRes.count ?? 0;
    const tasksCompleted = tasksCountRes.count ?? 0;
    const earnedBadgeIds = new Set((earnedBadgesRes.data ?? []).map((b: any) => b.badge_id));

    // Fetch all badges
    const { data: allBadges } = await supabaseAdmin.from('badges').select('*');
    if (!allBadges || !progress) {
      return new Response(JSON.stringify({ awarded: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const newlyAwarded: string[] = [];

    for (const badge of allBadges) {
      if (earnedBadgeIds.has(badge.id)) continue; // Already earned

      let qualifies = false;
      const criteria = badge.unlock_criteria;

      if (criteria.includes('streak_days') && progress.current_streak_days >= parseInt(criteria.split('>= ')[1])) {
        qualifies = true;
      } else if (criteria.includes('total_sessions') && totalSessions >= parseInt(criteria.split('>= ')[1])) {
        qualifies = true;
      } else if (criteria.includes('tasks_completed') && tasksCompleted >= parseInt(criteria.split('>= ')[1])) {
        qualifies = true;
      }

      if (qualifies) {
        await supabaseAdmin.from('user_badges').insert({ user_id, badge_id: badge.id });
        await supabaseAdmin.from('notifications').insert({
          user_id,
          title: `🏆 Badge Unlocked: ${badge.name}`,
          body: badge.description,
        });
        newlyAwarded.push(badge.name);
      }
    }

    return new Response(JSON.stringify({ awarded: newlyAwarded }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
