/**
 * LadyBug Database Types
 * 
 * Strongly-typed interfaces for every entity in the Supabase schema.
 * These types are the single source of truth for data shapes across
 * the entire client codebase.
 */

// ──────────────────────────────────────────────
// Enums
// ──────────────────────────────────────────────

export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';

// ──────────────────────────────────────────────
// Core Entities
// ──────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url: string | null;
  created_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  current_level: number;
  level_title: string;
  next_level_title: string;
  current_xp: number;
  xp_to_next_level: number;
  current_streak_days: number;
  longest_streak_days: number;
  daily_progress_pct: number;
  daily_goal: string;
  updated_at: string;
}

export interface Subject {
  id: string;
  name: string;
  icon_name: string;
  color_hex: string;
}

export interface Task {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  is_completed: boolean;
  due_date: string;
  priority: Priority;
  created_at: string;
  // Joined
  subject?: Subject;
}

export interface Exam {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  description: string | null;
  exam_date: string;
  focus_topics: string | null;
  study_progress_pct: number;
  created_at: string;
  // Joined
  subject?: Subject;
}

export interface Assignment {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  due_date: string;
  priority: Priority;
  is_submitted: boolean;
  created_at: string;
  // Joined
  subject?: Subject;
}

export interface StudySession {
  id: string;
  user_id: string;
  subject_id: string | null;
  duration_minutes: number;
  session_date: string;
  created_at: string;
  // Joined
  subject?: Subject;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  tier: BadgeTier;
  icon_name: string;
  color_hex: string;
  unlock_criteria: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  // Joined
  badge?: Badge;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

// ──────────────────────────────────────────────
// Aggregated API Response Types
// ──────────────────────────────────────────────

/** The single payload returned by the `/dashboard` aggregate endpoint */
export interface DashboardData {
  user: User;
  progress: UserProgress;
  tasks_today: Task[];
  upcoming_exams: Exam[];
  pending_assignments: Assignment[];
  weekly_sessions: StudySession[];
}

/** The payload for the Evolution Center screen */
export interface EvolutionData {
  progress: UserProgress;
  earned_badges: UserBadge[];
  all_badges: Badge[];
}

/** The payload for the Exams Dashboard screen */
export interface ExamsData {
  critical_exams: Exam[];
  upcoming_exams: Exam[];
  all_exams: Exam[];
}

// ──────────────────────────────────────────────
// Supabase Database type map (for supabase-js generics)
// ──────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      users: { Row: User; Insert: Omit<User, 'id' | 'created_at'>; Update: Partial<Omit<User, 'id'>> };
      user_progress: { Row: UserProgress; Insert: Omit<UserProgress, 'id' | 'updated_at'>; Update: Partial<Omit<UserProgress, 'id'>> };
      subjects: { Row: Subject; Insert: Omit<Subject, 'id'>; Update: Partial<Omit<Subject, 'id'>> };
      tasks: { Row: Task; Insert: Omit<Task, 'id' | 'created_at'>; Update: Partial<Omit<Task, 'id'>> };
      exams: { Row: Exam; Insert: Omit<Exam, 'id' | 'created_at'>; Update: Partial<Omit<Exam, 'id'>> };
      assignments: { Row: Assignment; Insert: Omit<Assignment, 'id' | 'created_at'>; Update: Partial<Omit<Assignment, 'id'>> };
      study_sessions: { Row: StudySession; Insert: Omit<StudySession, 'id' | 'created_at'>; Update: Partial<Omit<StudySession, 'id'>> };
      badges: { Row: Badge; Insert: Omit<Badge, 'id'>; Update: Partial<Omit<Badge, 'id'>> };
      user_badges: { Row: UserBadge; Insert: Omit<UserBadge, 'id'>; Update: Partial<Omit<UserBadge, 'id'>> };
      notifications: { Row: Notification; Insert: Omit<Notification, 'id' | 'created_at'>; Update: Partial<Omit<Notification, 'id'>> };
    };
  };
}
