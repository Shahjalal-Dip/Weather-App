const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const pool = require('./config/db')

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ 
  origin: ['http://localhost:3000', 'https://frontend-cusyw1roe-shah-jalal-dips-projects.vercel.app'], 
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  const { username } = req.body;
  const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken'});
    }
});

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
