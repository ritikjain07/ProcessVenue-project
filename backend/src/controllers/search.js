const { all } = require('../db');

// Search across all resources
const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const searchTerm = `%${q}%`;
    
    // Search in profile
    const profiles = await all(
      `SELECT id, 'profile' as type, name, email, bio, github_url as url
       FROM profile
       WHERE name LIKE ? OR email LIKE ? OR bio LIKE ?`,
      [searchTerm, searchTerm, searchTerm]
    );
    
    // Search in projects
    const projects = await all(
      `SELECT id, 'project' as type, title as name, description, repository_url as url, demo_url
       FROM projects
       WHERE title LIKE ? OR description LIKE ?`,
      [searchTerm, searchTerm]
    );
    
    // Search in skills
    const skills = await all(
      `SELECT id, 'skill' as type, name, proficiency as description, NULL as url
       FROM skills
       WHERE name LIKE ?`,
      [searchTerm]
    );
    
    // Search in education
    const education = await all(
      `SELECT id, 'education' as type, institution as name, degree || ' in ' || field_of_study as description, NULL as url
       FROM education
       WHERE institution LIKE ? OR degree LIKE ? OR field_of_study LIKE ? OR description LIKE ?`,
      [searchTerm, searchTerm, searchTerm, searchTerm]
    );
    
    // Search in work experience
    const workExperience = await all(
      `SELECT id, 'work' as type, company_name as name, role || ' - ' || description as description, NULL as url
       FROM work_experience
       WHERE company_name LIKE ? OR role LIKE ? OR description LIKE ?`,
      [searchTerm, searchTerm, searchTerm]
    );
    
    // Combine all results
    const results = [
      ...profiles,
      ...projects,
      ...skills,
      ...education,
      ...workExperience
    ];
    
    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search
};
