
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jruuoertwrtowdogledy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpydXVvZXJ0d3J0b3dkb2dsZWR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NzA2NjQsImV4cCI6MjA1ODI0NjY2NH0.noDbD1mx4jxiyWflr6KTFWE9uIwQ848DceG8N0RM3qk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
