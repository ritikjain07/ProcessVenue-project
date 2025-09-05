const { get, all, run } = require('../db');

// Get all projects or filter by skill
const getProjects = async (req, res, next) => {
  try {
    const { skill } = req.query;
    
    let projects;
    
    if (skill) {
      // Get projects filtered by skill
      projects = await all(
        `SELECT p.* 
         FROM projects p
         JOIN project_skills ps ON p.id = ps.project_id
         JOIN skills s ON ps.skill_id = s.id
         WHERE s.name LIKE ?
         GROUP BY p.id
         ORDER BY p.end_date DESC, p.start_date DESC`,
        [`%${skill}%`]
      );
    } else {
      // Get all projects
      projects = await all('SELECT * FROM projects ORDER BY end_date DESC, start_date DESC');
    }
    
    // Get skills for each project
    for (const project of projects) {
      const skills = await all(
        `SELECT s.* 
         FROM skills s
         JOIN project_skills ps ON s.id = ps.skill_id
         WHERE ps.project_id = ?`,
        [project.id]
      );
      
      project.skills = skills;
    }
    
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// Get a project by ID
const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const project = await get('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Get skills for the project
    const skills = await all(
      `SELECT s.* 
       FROM skills s
       JOIN project_skills ps ON s.id = ps.skill_id
       WHERE ps.project_id = ?`,
      [id]
    );
    
    project.skills = skills;
    
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// Create a new project
const createProject = async (req, res, next) => {
  try {
    const { title, description, repository_url, demo_url, image_url, start_date, end_date, skills } = req.body;
    
    // Insert project
    const result = await run(
      `INSERT INTO projects 
       (title, description, repository_url, demo_url, image_url, start_date, end_date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, description, repository_url, demo_url, image_url, start_date, end_date]
    );
    
    const projectId = result.id;
    
    // If skills are provided, link them to the project
    if (skills && Array.isArray(skills) && skills.length > 0) {
      for (const skillId of skills) {
        await run(
          'INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)',
          [projectId, skillId]
        );
      }
    }
    
    // Get the created project with its skills
    const project = await get('SELECT * FROM projects WHERE id = ?', [projectId]);
    
    const projectSkills = await all(
      `SELECT s.* 
       FROM skills s
       JOIN project_skills ps ON s.id = ps.skill_id
       WHERE ps.project_id = ?`,
      [projectId]
    );
    
    project.skills = projectSkills;
    
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

// Update a project
const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, repository_url, demo_url, image_url, start_date, end_date, skills } = req.body;
    
    // Check if project exists
    const project = await get('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Update project
    await run(
      `UPDATE projects SET 
         title = COALESCE(?, title),
         description = COALESCE(?, description),
         repository_url = COALESCE(?, repository_url),
         demo_url = COALESCE(?, demo_url),
         image_url = COALESCE(?, image_url),
         start_date = COALESCE(?, start_date),
         end_date = COALESCE(?, end_date)
       WHERE id = ?`,
      [title, description, repository_url, demo_url, image_url, start_date, end_date, id]
    );
    
    // If skills are provided, update project skills
    if (skills && Array.isArray(skills)) {
      // Delete existing project skills
      await run('DELETE FROM project_skills WHERE project_id = ?', [id]);
      
      // Add new project skills
      for (const skillId of skills) {
        await run(
          'INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)',
          [id, skillId]
        );
      }
    }
    
    // Get the updated project with its skills
    const updatedProject = await get('SELECT * FROM projects WHERE id = ?', [id]);
    
    const projectSkills = await all(
      `SELECT s.* 
       FROM skills s
       JOIN project_skills ps ON s.id = ps.skill_id
       WHERE ps.project_id = ?`,
      [id]
    );
    
    updatedProject.skills = projectSkills;
    
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// Delete a project
const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await get('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Delete project skills (cascade will handle this, but being explicit)
    await run('DELETE FROM project_skills WHERE project_id = ?', [id]);
    
    // Delete project
    await run('DELETE FROM projects WHERE id = ?', [id]);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
