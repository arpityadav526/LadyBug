/**
 * useDashboard hook
 *
 * Fetches all data needed for the Home Dashboard screen in parallel.
 * Returns a loading state and the assembled DashboardData object.
 */

import { useState, useEffect, useCallback } from 'react';
import { tasksApi, examsApi, assignmentsApi, studyApi, progressApi } from '../services/api';
import type { DashboardData, Task, Exam, Assignment, StudySession, UserProgress } from '../types/database';
import { useAuth } from '../providers/AuthProvider';

interface UseDashboardReturn {
  data: DashboardData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useDashboard(): UseDashboardReturn {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboard = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      // Fetch all data sources in parallel for speed
      const [progress, tasksToday, upcomingExams, pendingAssignments, weeklySessions] = await Promise.all([
        progressApi.get(),
        tasksApi.getToday(),
        examsApi.getUpcoming(2),
        assignmentsApi.getPending(),
        studyApi.getWeeklySessions(),
      ]);

      setData({
        user: {
          id: user.id,
          email: user.email ?? '',
          display_name: user.user_metadata?.display_name ?? 'Student',
          avatar_url: user.user_metadata?.avatar_url ?? null,
          created_at: user.created_at,
        },
        progress: progress ?? {
          id: '',
          user_id: user.id,
          current_level: 1,
          level_title: 'Seedling',
          next_level_title: 'Sprout',
          current_xp: 0,
          xp_to_next_level: 500,
          current_streak_days: 0,
          longest_streak_days: 0,
          daily_progress_pct: 0,
          daily_goal: '4h',
          updated_at: new Date().toISOString(),
        },
        tasks_today: tasksToday,
        upcoming_exams: upcomingExams,
        pending_assignments: pendingAssignments,
        weekly_sessions: weeklySessions,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load dashboard'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { data, loading, error, refresh: fetchDashboard };
}
