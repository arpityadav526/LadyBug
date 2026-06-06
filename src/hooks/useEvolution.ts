/**
 * useEvolution hook
 *
 * Fetches gamification data for the Evolution Center screen:
 * user progress (XP, level, streak) and earned badges.
 */

import { useState, useEffect, useCallback } from 'react';
import { progressApi, badgesApi, studyApi } from '../services/api';
import type { EvolutionData } from '../types/database';
import { useAuth } from '../providers/AuthProvider';

interface UseEvolutionReturn {
  data: EvolutionData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  logStudySession: (durationMinutes: number, subjectId?: string) => Promise<void>;
}

export function useEvolution(): UseEvolutionReturn {
  const { user } = useAuth();
  const [data, setData] = useState<EvolutionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvolution = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const [progress, earnedBadges, allBadges] = await Promise.all([
        progressApi.get(),
        badgesApi.getEarned(),
        badgesApi.getAll(),
      ]);

      setData({
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
        earned_badges: earnedBadges,
        all_badges: allBadges,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load evolution data'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const logStudySession = useCallback(async (durationMinutes: number, subjectId?: string) => {
    const today = new Date().toISOString().split('T')[0];
    await studyApi.logSession({
      duration_minutes: durationMinutes,
      session_date: today,
      subject_id: subjectId,
    });
    // Refresh after logging — the gamification engine (Edge Function)
    // will have processed XP by the time we re-fetch
    await fetchEvolution();
  }, [fetchEvolution]);

  useEffect(() => {
    fetchEvolution();
  }, [fetchEvolution]);

  return { data, loading, error, refresh: fetchEvolution, logStudySession };
}
