import 'react-native-url-polyfill/auto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Database } from '../types/database';

// ──────────────────────────────────────────────
// Secure token storage adapter for Supabase Auth
// Uses expo-secure-store on native, localStorage on web
// ──────────────────────────────────────────────

const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

// ──────────────────────────────────────────────
// Supabase Client
// ──────────────────────────────────────────────

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

/**
 * `true` when proper Supabase credentials are configured.
 * When `false`, the app runs in offline/demo mode with hardcoded data.
 */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

if (!isSupabaseConfigured) {
  console.warn(
    '[LadyBug] Missing Supabase env vars. Running in demo mode.\n' +
    'Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in a .env file to connect a backend.',
  );
}

// Use a safe placeholder URL to avoid the "supabaseUrl is required" crash.
// All queries will simply fail gracefully when not configured.
const SAFE_URL = SUPABASE_URL || 'https://placeholder.supabase.co';
const SAFE_KEY = SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase: SupabaseClient<Database> = createClient<Database>(SAFE_URL, SAFE_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // prevents issues with Expo deep links
  },
});
