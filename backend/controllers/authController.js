const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

     // Check if username already exists
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //insert new user
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );

       // Create token
       const token = jwt.sign(
        { id: newUser.rows[0].id, username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      
      res.status(201).json({
        message: 'User created successfully',
        user: { id: newUser.rows[0].id, username }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

   // Continuing from the previous login route
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find user
      const result = await pool.query(
        'SELECT * FROM users WHERE username = $1',
        [username]
      );
      
      if (result.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      const user = result.rows[0];
      
      // Compare password
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Create token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      
      // Set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      
      res.json({
        message: 'Login successful',
        user: { id: user.id, username: user.username }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

const checkAuth = (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
};

module.exports = { register, login, logout, checkAuth };
