// In your frontend (e.g., src/utils/supabaseClient.js)
import { createClient } from '@supabase/supabase-js';
const dotenv = require("dotenv");
dotenv.config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);