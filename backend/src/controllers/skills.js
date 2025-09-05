const { get, all, run } = require('../db');

// Get all skills
const getSkills = async (req, res, next) => {
  try {
    const skills = await all('SELECT * FROM skills ORDER BY name');
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

// Get top skills (skills used in most projects)
const getTopSkills = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 5;
    
    const topSkills = await all(
      `SELECT s.*, COUNT(ps.project_id) as project_count 
       FROM skills s
       LEFT JOIN project_skills ps ON s.id = ps.skill_id
       GROUP BY s.id
       ORDER BY project_count DESC, s.name
       LIMIT ?`,
      [limit]
    );
    
    res.json(topSkills);
  } catch (error) {
    next(error);
  }
};

// Get a skill by ID
const getSkillById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const skill = await get('SELECT * FROM skills WHERE id = ?', [id]);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    // Get projects using this skill
    const projects = await all(
      `SELECT p.* 
       FROM projects p
       JOIN project_skills ps ON p.id = ps.project_id
       WHERE ps.skill_id = ?`,
      [id]
    );
    
    skill.projects = projects;
    
    res.json(skill);
  } catch (error) {
    next(error);
  }
};

// Create a new skill
const createSkill = async (req, res, next) => {
  try {
    const { name, proficiency } = req.body;
    
    // Check if skill already exists
    const existingSkill = await get('SELECT * FROM skills WHERE name = ?', [name]);
    
    if (existingSkill) {
      return res.status(409).json({ error: 'Skill already exists', skill: existingSkill });
    }
    
    const result = await run(
      'INSERT INTO skills (name, proficiency) VALUES (?, ?)',
      [name, proficiency]
    );
    
    const newSkill = await get('SELECT * FROM skills WHERE id = ?', [result.id]);
    
    res.status(201).json(newSkill);
  } catch (error) {
    next(error);
  }
};

// Update a skill
const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, proficiency } = req.body;
    
    // Check if skill exists
    const skill = await get('SELECT * FROM skills WHERE id = ?', [id]);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    await run(
      `UPDATE skills SET 
         name = COALESCE(?, name),
         proficiency = COALESCE(?, proficiency)
       WHERE id = ?`,
      [name, proficiency, id]
    );
    
    const updatedSkill = await get('SELECT * FROM skills WHERE id = ?', [id]);
    
    res.json(updatedSkill);
  } catch (error) {
    next(error);
  }
};

// Delete a skill
const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if skill exists
    const skill = await get('SELECT * FROM skills WHERE id = ?', [id]);
    
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    
    // Delete skill's project associations
    await run('DELETE FROM project_skills WHERE skill_id = ?', [id]);
    
    // Delete skill
    await run('DELETE FROM skills WHERE id = ?', [id]);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getTopSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
};
