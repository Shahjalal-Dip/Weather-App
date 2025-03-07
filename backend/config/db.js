// Database connection
const Pool = require("pg").Pool;
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'weatherapp',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  });
 
  module.exports = pool;

