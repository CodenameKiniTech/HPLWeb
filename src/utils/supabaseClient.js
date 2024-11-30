import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rnuwbqqeutbciuqzcymd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJudXdicXFldXRiY2l1cXpjeW1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTA5MTAsImV4cCI6MjA0NTI2NjkxMH0.6pXG1J3VU8v2zkirM_RUP3mWrM0Nz2OHjx9Vl_uYXsI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
