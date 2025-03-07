const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createClient } = require("@supabase/supabase-js");
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
        origin: 'http://localhost:3000', 
        credentials: true }
      ));
app.use(express.json());
app.use(cookieParser());

// Supabase connection
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Sample API Route (Test it with Postman)
app.get("/weather", async (req, res) => {
  const { data, error } = await supabase.from("weather_data").select("*");
  if (error) return res.status(500).json(error);
  res.json(data); 
});

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
