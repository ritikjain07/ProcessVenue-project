const express = require('express');
const { search } = require('../controllers/search');

const router = express.Router();

// GET /api/search?q=... - Search across all resources
router.get('/', search);

module.exports = router;
