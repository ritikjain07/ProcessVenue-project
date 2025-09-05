const express = require('express');
const { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require('../controllers/projects');

const router = express.Router();

// GET /api/projects - Get all projects or filter by skill
router.get('/', getProjects);

// GET /api/projects/:id - Get a project by ID
router.get('/:id', getProjectById);

// POST /api/projects - Create a new project
router.post('/', createProject);

// PUT /api/projects/:id - Update a project
router.put('/:id', updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete('/:id', deleteProject);

module.exports = router;
