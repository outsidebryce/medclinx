import { createClient } from '@supabase/supabase-js'

console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL)
console.log('REACT_APP_SUPABASE_ANON_KEY:', process.env.REACT_APP_SUPABASE_ANON_KEY)

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || ''
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Check your environment variables.')
} else {
  console.log('Supabase URL and Anon Key are present.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)