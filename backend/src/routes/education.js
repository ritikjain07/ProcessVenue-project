const express = require('express');
const { 
  getEducation, 
  getEducationById, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} = require('../controllers/education');

const router = express.Router();

// GET /api/education - Get all education entries
router.get('/', getEducation);

// GET /api/education/:id - Get education entry by ID
router.get('/:id', getEducationById);

// POST /api/education - Create a new education entry
router.post('/', createEducation);

// PUT /api/education/:id - Update an education entry
router.put('/:id', updateEducation);

// DELETE /api/education/:id - Delete an education entry
router.delete('/:id', deleteEducation);

module.exports = router;
