const { get, all, run } = require('../db');

// Get all education entries
const getEducation = async (req, res, next) => {
  try {
    const education = await all('SELECT * FROM education ORDER BY start_date DESC');
    res.json(education);
  } catch (error) {
    next(error);
  }
};

// Get education entry by ID
const getEducationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const education = await get('SELECT * FROM education WHERE id = ?', [id]);
    
    if (!education) {
      return res.status(404).json({ error: 'Education entry not found' });
    }
    
    res.json(education);
  } catch (error) {
    next(error);
  }
};

// Create a new education entry
const createEducation = async (req, res, next) => {
  try {
    const { institution, degree, field_of_study, start_date, end_date, description } = req.body;
    
    const result = await run(
      `INSERT INTO education 
       (institution, degree, field_of_study, start_date, end_date, description) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [institution, degree, field_of_study, start_date, end_date, description]
    );
    
    const newEducation = await get('SELECT * FROM education WHERE id = ?', [result.id]);
    
    res.status(201).json(newEducation);
  } catch (error) {
    next(error);
  }
};

// Update an education entry
const updateEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { institution, degree, field_of_study, start_date, end_date, description } = req.body;
    
    // Check if education entry exists
    const education = await get('SELECT * FROM education WHERE id = ?', [id]);
    
    if (!education) {
      return res.status(404).json({ error: 'Education entry not found' });
    }
    
    await run(
      `UPDATE education SET 
         institution = COALESCE(?, institution),
         degree = COALESCE(?, degree),
         field_of_study = COALESCE(?, field_of_study),
         start_date = COALESCE(?, start_date),
         end_date = COALESCE(?, end_date),
         description = COALESCE(?, description)
       WHERE id = ?`,
      [institution, degree, field_of_study, start_date, end_date, description, id]
    );
    
    const updatedEducation = await get('SELECT * FROM education WHERE id = ?', [id]);
    
    res.json(updatedEducation);
  } catch (error) {
    next(error);
  }
};

// Delete an education entry
const deleteEducation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if education entry exists
    const education = await get('SELECT * FROM education WHERE id = ?', [id]);
    
    if (!education) {
      return res.status(404).json({ error: 'Education entry not found' });
    }
    
    await run('DELETE FROM education WHERE id = ?', [id]);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};
