import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

let supabase: ReturnType<typeof createClient<Database>> | null = null;

if (typeof window !== 'undefined') {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Supabase credentials are missing. Please connect your Supabase project first.');
    } else {
      supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
    }
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
  }
}

export { supabase };