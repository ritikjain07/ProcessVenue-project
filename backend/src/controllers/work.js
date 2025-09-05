const { get, all, run } = require('../db');

// Get all work experience entries
const getWorkExperience = async (req, res, next) => {
  try {
    const workExperience = await all('SELECT * FROM work_experience ORDER BY start_date DESC');
    res.json(workExperience);
  } catch (error) {
    next(error);
  }
};

// Get work experience entry by ID
const getWorkExperienceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const workExperience = await get('SELECT * FROM work_experience WHERE id = ?', [id]);
    
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience entry not found' });
    }
    
    res.json(workExperience);
  } catch (error) {
    next(error);
  }
};

// Create a new work experience entry
const createWorkExperience = async (req, res, next) => {
  try {
    const { company_name, role, start_date, end_date, description } = req.body;
    
    const result = await run(
      `INSERT INTO work_experience 
       (company_name, role, start_date, end_date, description) 
       VALUES (?, ?, ?, ?, ?)`,
      [company_name, role, start_date, end_date, description]
    );
    
    const newWorkExperience = await get('SELECT * FROM work_experience WHERE id = ?', [result.id]);
    
    res.status(201).json(newWorkExperience);
  } catch (error) {
    next(error);
  }
};

// Update a work experience entry
const updateWorkExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company_name, role, start_date, end_date, description } = req.body;
    
    // Check if work experience entry exists
    const workExperience = await get('SELECT * FROM work_experience WHERE id = ?', [id]);
    
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience entry not found' });
    }
    
    await run(
      `UPDATE work_experience SET 
         company_name = COALESCE(?, company_name),
         role = COALESCE(?, role),
         start_date = COALESCE(?, start_date),
         end_date = COALESCE(?, end_date),
         description = COALESCE(?, description)
       WHERE id = ?`,
      [company_name, role, start_date, end_date, description, id]
    );
    
    const updatedWorkExperience = await get('SELECT * FROM work_experience WHERE id = ?', [id]);
    
    res.json(updatedWorkExperience);
  } catch (error) {
    next(error);
  }
};

// Delete a work experience entry
const deleteWorkExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if work experience entry exists
    const workExperience = await get('SELECT * FROM work_experience WHERE id = ?', [id]);
    
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience entry not found' });
    }
    
    await run('DELETE FROM work_experience WHERE id = ?', [id]);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWorkExperience,
  getWorkExperienceById,
  createWorkExperience,
  updateWorkExperience,
  deleteWorkExperience
};
