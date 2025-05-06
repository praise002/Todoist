import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://snfpjeuqswmdnbujkdjq.supabase.co';
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZnBqZXVxc3dtZG5idWprZGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMjM5MTYsImV4cCI6MjA2MTc5OTkxNn0.zcIIFRIzLjF14tcPuZvin71zOEfCMXGPtL7q0OwmPBk';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


// npm install @supabase/supabase-js
