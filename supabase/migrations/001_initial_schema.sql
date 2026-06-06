-- ============================================================
-- LadyBug Student Success Platform — Initial Schema
-- Supabase / PostgreSQL Migration
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────
-- 1. Subjects (reference table)
-- ──────────────────────────────────────────────
CREATE TABLE public.subjects (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL,
  icon_name  TEXT NOT NULL DEFAULT 'book',
  color_hex  TEXT NOT NULL DEFAULT '#286182'
);

-- Seed default subjects
INSERT INTO public.subjects (name, icon_name, color_hex) VALUES
  ('Mathematics',    'calculate',   '#b7102a'),
  ('Science',        'science',     '#2e7d32'),
  ('Literature',     'menu_book',   '#665e49'),
  ('History',        'history_edu', '#8f6f6e'),
  ('Computer Science', 'computer',  '#286182'),
  ('DBMS',           'storage',     '#b7102a'),
  ('Operating Systems', 'memory',   '#447a9c');

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subjects are readable by everyone" ON public.subjects FOR SELECT USING (true);

-- ──────────────────────────────────────────────
-- 2. User Progress (1-to-1 with auth.users)
-- ──────────────────────────────────────────────
CREATE TABLE public.user_progress (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  current_level       INT NOT NULL DEFAULT 1,
  level_title         TEXT NOT NULL DEFAULT 'Seedling',
  next_level_title    TEXT NOT NULL DEFAULT 'Sprout',
  current_xp          INT NOT NULL DEFAULT 0,
  xp_to_next_level    INT NOT NULL DEFAULT 500,
  current_streak_days INT NOT NULL DEFAULT 0,
  longest_streak_days INT NOT NULL DEFAULT 0,
  daily_progress_pct  REAL NOT NULL DEFAULT 0,
  daily_goal          TEXT NOT NULL DEFAULT '4h',
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own progress"  ON public.user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert progress"   ON public.user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create a progress row when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ──────────────────────────────────────────────
-- 3. Tasks
-- ──────────────────────────────────────────────
CREATE TABLE public.tasks (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id   UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  title        TEXT NOT NULL,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  due_date     DATE NOT NULL,
  priority     TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_tasks_user_due ON public.tasks (user_id, due_date);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 4. Exams
-- ──────────────────────────────────────────────
CREATE TABLE public.exams (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id         UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  title              TEXT NOT NULL,
  description        TEXT,
  exam_date          TIMESTAMPTZ NOT NULL,
  focus_topics       TEXT,
  study_progress_pct INT NOT NULL DEFAULT 0 CHECK (study_progress_pct BETWEEN 0 AND 100),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exams_user_date ON public.exams (user_id, exam_date);

ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their exams" ON public.exams FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 5. Assignments
-- ──────────────────────────────────────────────
CREATE TABLE public.assignments (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id   UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  title        TEXT NOT NULL,
  due_date     TIMESTAMPTZ NOT NULL,
  priority     TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  is_submitted BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assignments_user ON public.assignments (user_id, is_submitted);

ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their assignments" ON public.assignments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 6. Study Sessions
-- ──────────────────────────────────────────────
CREATE TABLE public.study_sessions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id       UUID REFERENCES public.subjects(id) ON DELETE SET NULL,
  duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
  session_date     DATE NOT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sessions_user_date ON public.study_sessions (user_id, session_date);

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their sessions" ON public.study_sessions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 7. Badges (global reference table)
-- ──────────────────────────────────────────────
CREATE TABLE public.badges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  description     TEXT NOT NULL,
  tier            TEXT NOT NULL DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  icon_name       TEXT NOT NULL DEFAULT 'emoji_events',
  color_hex       TEXT NOT NULL DEFAULT '#fbc02d',
  unlock_criteria TEXT NOT NULL
);

-- Seed default badges
INSERT INTO public.badges (name, description, tier, icon_name, color_hex, unlock_criteria) VALUES
  ('7 Day Streak',    'Study for 7 consecutive days',           'gold',     'local_fire_department', '#fbc02d', 'streak_days >= 7'),
  ('Study Master',    'Complete 50 study sessions',             'gold',     'school',                '#1565c0', 'total_sessions >= 50'),
  ('Early Bird',      'Start a study session before 7 AM',      'silver',   'wb_sunny',              '#ff8f00', 'early_session = true'),
  ('Exam Crusher',    'Score above 90% on 3 exams',             'platinum', 'military_tech',         '#b7102a', 'high_scores >= 3'),
  ('Consistency King','Maintain a 30-day streak',                'platinum', 'diamond',               '#6a1b9a', 'streak_days >= 30'),
  ('First Steps',     'Complete your first task',               'bronze',   'flag',                  '#2e7d32', 'tasks_completed >= 1'),
  ('Task Machine',    'Complete 100 tasks',                     'gold',     'task_alt',              '#fbc02d', 'tasks_completed >= 100');

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Badges are readable by everyone" ON public.badges FOR SELECT USING (true);

-- ──────────────────────────────────────────────
-- 8. User Badges (many-to-many join)
-- ──────────────────────────────────────────────
CREATE TABLE public.user_badges (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id  UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_id)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert badges"  ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 9. Notifications
-- ──────────────────────────────────────────────
CREATE TABLE public.notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL,
  is_read    BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user ON public.notifications (user_id, is_read, created_at DESC);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own their notifications" ON public.notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- 10. XP Calculation Trigger (Gamification Engine)
--
-- When a study session is inserted, automatically award
-- XP to the user's progress and check for level-up.
-- ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.award_xp_on_session()
RETURNS TRIGGER AS $$
DECLARE
  xp_gained INT;
  current_progress RECORD;
BEGIN
  -- Award 10 XP per minute studied
  xp_gained := NEW.duration_minutes * 10;

  -- Fetch current progress
  SELECT * INTO current_progress FROM public.user_progress WHERE user_id = NEW.user_id;

  IF current_progress IS NULL THEN
    RETURN NEW;
  END IF;

  -- Update XP
  UPDATE public.user_progress
  SET
    current_xp = current_progress.current_xp + xp_gained,
    updated_at = now()
  WHERE user_id = NEW.user_id;

  -- Check for level-up
  IF (current_progress.current_xp + xp_gained) >= current_progress.xp_to_next_level THEN
    UPDATE public.user_progress
    SET
      current_level = current_progress.current_level + 1,
      current_xp = (current_progress.current_xp + xp_gained) - current_progress.xp_to_next_level,
      xp_to_next_level = ROUND(current_progress.xp_to_next_level * 1.5),
      level_title = current_progress.next_level_title,
      next_level_title = CASE current_progress.current_level + 1
        WHEN 2  THEN 'Sprout'
        WHEN 3  THEN 'Sapling'
        WHEN 4  THEN 'Bloomer'
        WHEN 5  THEN 'Garden Keeper'
        WHEN 6  THEN 'Forest Guide'
        WHEN 7  THEN 'Nature Scholar'
        WHEN 8  THEN 'Ecosystem Master'
        WHEN 9  THEN 'Biome Architect'
        WHEN 10 THEN 'Scholar Bug'
        WHEN 11 THEN 'Knowledge Beetle'
        WHEN 12 THEN 'Wisdom Monarch'
        WHEN 13 THEN 'Dean''s List Beetle'
        ELSE 'Legendary ' || (current_progress.current_level + 1)
      END,
      updated_at = now()
    WHERE user_id = NEW.user_id;

    -- Notify the user about the level-up
    INSERT INTO public.notifications (user_id, title, body)
    VALUES (
      NEW.user_id,
      'Level Up! 🎉',
      'Congratulations! You reached Level ' || (current_progress.current_level + 1) || '!'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_study_session_insert
  AFTER INSERT ON public.study_sessions
  FOR EACH ROW EXECUTE FUNCTION public.award_xp_on_session();
