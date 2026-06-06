/**
 * useExams hook
 *
 * Fetches exam data for the Exams Dashboard screen.
 * Separates exams into critical (< 7 days), upcoming, and all.
 */

import { useState, useEffect, useCallback } from 'react';
import { examsApi } from '../services/api';
import type { Exam, ExamsData } from '../types/database';
import { useAuth } from '../providers/AuthProvider';

interface UseExamsReturn {
  data: ExamsData | null;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  updateProgress: (examId: string, progressPct: number) => Promise<void>;
}

export function useExams(): UseExamsReturn {
  const { user } = useAuth();
  const [data, setData] = useState<ExamsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExams = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const allExams = await examsApi.getAll();
      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);

      const futureExams = allExams.filter((e) => new Date(e.exam_date) > now);
      const critical = futureExams.filter((e) => new Date(e.exam_date) <= sevenDaysFromNow);
      const upcoming = futureExams.filter((e) => new Date(e.exam_date) > sevenDaysFromNow);

      setData({
        critical_exams: critical,
        upcoming_exams: upcoming,
        all_exams: futureExams,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load exams'));
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProgress = useCallback(async (examId: string, progressPct: number) => {
    await examsApi.updateProgress(examId, progressPct);
    await fetchExams(); // Refresh after update
  }, [fetchExams]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return { data, loading, error, refresh: fetchExams, updateProgress };
}
