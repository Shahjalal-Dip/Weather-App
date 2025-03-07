const express = require('express');
const { getLocations, saveLocation, deleteLocation } = require('../controllers/locationController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.get('/', authenticateToken, getLocations);
router.post('/', authenticateToken, saveLocation);
router.delete('/:id', authenticateToken, deleteLocation);

module.exports = router;
