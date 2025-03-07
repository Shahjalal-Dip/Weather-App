// Database connection
const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required for Supabase connection
    database: 'weatherapp',
  });
 
  module.exports = pool;

