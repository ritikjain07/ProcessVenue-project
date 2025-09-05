const express = require('express');
const { getProfile, createProfile, updateProfile } = require('../controllers/profile');

const router = express.Router();

// GET /api/profile - Get profile information
router.get('/', getProfile);

// POST /api/profile - Create profile
router.post('/', createProfile);

// PUT /api/profile - Update profile
router.put('/', updateProfile);

module.exports = router;
