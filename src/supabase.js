import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://vpnfkjsiemocipwefywj.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwbmZranNpZW1vY2lwd2VmeXdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjE1NjYsImV4cCI6MjA5MzkzNzU2Nn0.LkHWqcarqmVIqVIeeM2CqU-BvsS56_YuDfrleTgbYcQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)