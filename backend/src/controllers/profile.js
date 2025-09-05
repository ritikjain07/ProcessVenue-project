const { get, all, run } = require('../db');

// Get profile information
const getProfile = async (req, res, next) => {
  try {
    const profile = await get('SELECT * FROM profile LIMIT 1');
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// Create profile (Should only be one profile in the system)
const createProfile = async (req, res, next) => {
  try {
    const { name, email, bio, github_url, linkedin_url, portfolio_url } = req.body;
    
    // Check if profile already exists
    const existingProfile = await get('SELECT COUNT(*) as count FROM profile');
    
    if (existingProfile.count > 0) {
      return res.status(409).json({ error: 'Profile already exists. Use PUT to update.' });
    }
    
    const result = await run(
      'INSERT INTO profile (name, email, bio, github_url, linkedin_url, portfolio_url) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, bio, github_url, linkedin_url, portfolio_url]
    );
    
    const newProfile = await get('SELECT * FROM profile WHERE id = ?', [result.id]);
    
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

// Update profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, bio, github_url, linkedin_url, portfolio_url } = req.body;
    
    // Check if profile exists
    const profile = await get('SELECT * FROM profile LIMIT 1');
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found. Create a profile first.' });
    }
    
    await run(
      `UPDATE profile SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        bio = COALESCE(?, bio),
        github_url = COALESCE(?, github_url),
        linkedin_url = COALESCE(?, linkedin_url),
        portfolio_url = COALESCE(?, portfolio_url)
      WHERE id = ?`,
      [name, email, bio, github_url, linkedin_url, portfolio_url, profile.id]
    );
    
    const updatedProfile = await get('SELECT * FROM profile WHERE id = ?', [profile.id]);
    
    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile
};
