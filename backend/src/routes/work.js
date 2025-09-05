const express = require('express');
const { 
  getWorkExperience, 
  getWorkExperienceById, 
  createWorkExperience, 
  updateWorkExperience, 
  deleteWorkExperience 
} = require('../controllers/work');

const router = express.Router();

// GET /api/work - Get all work experience entries
router.get('/', getWorkExperience);

// GET /api/work/:id - Get work experience entry by ID
router.get('/:id', getWorkExperienceById);

// POST /api/work - Create a new work experience entry
router.post('/', createWorkExperience);

// PUT /api/work/:id - Update a work experience entry
router.put('/:id', updateWorkExperience);

// DELETE /api/work/:id - Delete a work experience entry
router.delete('/:id', deleteWorkExperience);

module.exports = router;
