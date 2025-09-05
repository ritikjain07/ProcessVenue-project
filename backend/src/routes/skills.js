const express = require('express');
const { 
  getSkills, 
  getTopSkills,
  getSkillById, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} = require('../controllers/skills');

const router = express.Router();

// GET /api/skills - Get all skills
router.get('/', getSkills);

// GET /api/skills/top - Get top skills
router.get('/top', getTopSkills);

// GET /api/skills/:id - Get a skill by ID
router.get('/:id', getSkillById);

// POST /api/skills - Create a new skill
router.post('/', createSkill);

// PUT /api/skills/:id - Update a skill
router.put('/:id', updateSkill);

// DELETE /api/skills/:id - Delete a skill
router.delete('/:id', deleteSkill);

module.exports = router;
