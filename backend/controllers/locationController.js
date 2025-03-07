const pool = require('../config/db');

  
// Location Routes
const getLocations = async (req, res) => {
    try {
      const result = await pool.query(
        'SELECT * FROM saved_locations WHERE user_id = $1',
        [req.user.id]
      );
      
      res.json(result.rows);
    } catch (error) {
      console.error('Get locations error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const saveLocation = async (req, res) => {
    try {
      const { cityName } = req.body;
      
      // Check if location already exists for this user
      const locationExists = await pool.query(
        'SELECT * FROM saved_locations WHERE user_id = $1 AND city_name = $2',
        [req.user.id, cityName]
      );
      
      if (locationExists.rows.length > 0) {
        return res.status(400).json({ message: 'Location already saved' });
      }
      
      // Insert new location
      const newLocation = await pool.query(
        'INSERT INTO saved_locations (user_id, city_name) VALUES ($1, $2) RETURNING *',
        [req.user.id, cityName]
      );
      
      res.status(201).json(newLocation.rows[0]);
    } catch (error) {
      console.error('Save location error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const deleteLocation = async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if location belongs to user
      const location = await pool.query(
        'SELECT * FROM saved_locations WHERE id = $1 AND user_id = $2',
        [id, req.user.id]
      );
      
      if (location.rows.length === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }
      
      // Delete location
      await pool.query('DELETE FROM saved_locations WHERE id = $1', [id]);
      
      res.json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.error('Delete location error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports = { getLocations, saveLocation, deleteLocation };
