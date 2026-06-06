/**
 * Dashboard Aggregate Edge Function
 *
 * Returns all data needed for the Home Dashboard in a single
 * HTTP call, reducing client round-trips.
 *
 * Invoke: POST /functions/v1/dashboard-aggregate
 * Auth:   Requires Bearer token (Supabase JWT)
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
      },
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Parallel fetch
    const [progressRes, tasksRes, examsRes, assignmentsRes, sessionsRes] = await Promise.all([
      supabase.from('user_progress').select('*').eq('user_id', user.id).single(),
      supabase.from('tasks').select('*, subject:subjects(*)').eq('user_id', user.id).eq('due_date', today).order('priority', { ascending: false }),
      supabase.from('exams').select('*, subject:subjects(*)').eq('user_id', user.id).gte('exam_date', new Date().toISOString()).order('exam_date').limit(2),
      supabase.from('assignments').select('*, subject:subjects(*)').eq('user_id', user.id).eq('is_submitted', false).order('due_date'),
      supabase.from('study_sessions').select('*').eq('user_id', user.id).gte('session_date', weekAgo.toISOString().split('T')[0]).order('session_date'),
    ]);

    const dashboard = {
      user: {
        id: user.id,
        email: user.email,
        display_name: user.user_metadata?.display_name ?? 'Student',
        avatar_url: user.user_metadata?.avatar_url ?? null,
        created_at: user.created_at,
      },
      progress: progressRes.data,
      tasks_today: tasksRes.data ?? [],
      upcoming_exams: examsRes.data ?? [],
      pending_assignments: assignmentsRes.data ?? [],
      weekly_sessions: sessionsRes.data ?? [],
    };

    return new Response(JSON.stringify(dashboard), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
