/**
 * LadyBug API Service
 *
 * Thin, typed wrapper around the Supabase client.
 * All data-fetching logic lives here so screens/hooks never
 * import supabase directly.
 */

import { supabase } from '../lib/supabase';
import type {
  Task,
  Exam,
  Assignment,
  StudySession,
  UserProgress,
  UserBadge,
  Badge,
  Notification,
  DashboardData,
  EvolutionData,
  ExamsData,
} from '../types/database';

// ──────────────────────────────────────────────
// Auth
// ──────────────────────────────────────────────

export const authApi = {
  signUp: async (email: string, password: string, displayName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });
    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  },
};

// ──────────────────────────────────────────────
// User Progress
// ──────────────────────────────────────────────

export const progressApi = {
  get: async (): Promise<UserProgress | null> => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
    return data;
  },

  update: async (updates: Partial<UserProgress>) => {
    const { data, error } = await supabase
      .from('user_progress')
      .update(updates)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ──────────────────────────────────────────────
// Tasks
// ──────────────────────────────────────────────

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*, subject:subjects(*)')
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  getToday: async (): Promise<Task[]> => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*, subject:subjects(*)')
      .eq('due_date', today)
      .order('priority', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },

  create: async (task: { title: string; due_date: string; priority: string; subject_id?: string }) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  toggleComplete: async (id: string, is_completed: boolean) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({ is_completed })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) throw error;
  },
};

// ──────────────────────────────────────────────
// Exams
// ──────────────────────────────────────────────

export const examsApi = {
  getAll: async (): Promise<Exam[]> => {
    const { data, error } = await supabase
      .from('exams')
      .select('*, subject:subjects(*)')
      .order('exam_date', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  getUpcoming: async (limit = 2): Promise<Exam[]> => {
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('exams')
      .select('*, subject:subjects(*)')
      .gte('exam_date', now)
      .order('exam_date', { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data ?? [];
  },

  create: async (exam: { title: string; exam_date: string; description?: string; subject_id?: string; focus_topics?: string }) => {
    const { data, error } = await supabase
      .from('exams')
      .insert(exam)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  updateProgress: async (id: string, study_progress_pct: number) => {
    const { data, error } = await supabase
      .from('exams')
      .update({ study_progress_pct })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ──────────────────────────────────────────────
// Assignments
// ──────────────────────────────────────────────

export const assignmentsApi = {
  getPending: async (): Promise<Assignment[]> => {
    const { data, error } = await supabase
      .from('assignments')
      .select('*, subject:subjects(*)')
      .eq('is_submitted', false)
      .order('due_date', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },

  create: async (assignment: { title: string; due_date: string; priority: string; subject_id?: string }) => {
    const { data, error } = await supabase
      .from('assignments')
      .insert(assignment)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  markSubmitted: async (id: string) => {
    const { data, error } = await supabase
      .from('assignments')
      .update({ is_submitted: true })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

// ──────────────────────────────────────────────
// Study Sessions & Gamification
// ──────────────────────────────────────────────

export const studyApi = {
  logSession: async (session: { subject_id?: string; duration_minutes: number; session_date: string }) => {
    const { data, error } = await supabase
      .from('study_sessions')
      .insert(session)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  getWeeklySessions: async (): Promise<StudySession[]> => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*, subject:subjects(*)')
      .gte('session_date', weekAgo.toISOString().split('T')[0])
      .order('session_date', { ascending: true });
    if (error) throw error;
    return data ?? [];
  },
};

// ──────────────────────────────────────────────
// Badges
// ──────────────────────────────────────────────

export const badgesApi = {
  getAll: async (): Promise<Badge[]> => {
    const { data, error } = await supabase.from('badges').select('*');
    if (error) throw error;
    return data ?? [];
  },

  getEarned: async (): Promise<UserBadge[]> => {
    const { data, error } = await supabase
      .from('user_badges')
      .select('*, badge:badges(*)')
      .order('earned_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
};

// ──────────────────────────────────────────────
// Notifications
// ──────────────────────────────────────────────

export const notificationsApi = {
  getAll: async (): Promise<Notification[]> => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  },

  markRead: async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    if (error) throw error;
  },

  getUnreadCount: async (): Promise<number> => {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);
    if (error) throw error;
    return count ?? 0;
  },
};
