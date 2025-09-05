// API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function for making API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  const config = {
    ...options,
    headers
  };
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Something went wrong');
    }
    
    // For DELETE requests or other requests that might not return JSON
    if (response.status === 204) {
      return { success: true };
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

// Profile API
export const profileAPI = {
  getProfile: () => apiRequest('/profile'),
  
  updateProfile: (data) => apiRequest('/profile', {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  createProfile: (data) => apiRequest('/profile', {
    method: 'POST',
    body: JSON.stringify(data)
  })
};

// Projects API
export const projectsAPI = {
  getProjects: (skill) => apiRequest(`/projects${skill ? `?skill=${skill}` : ''}`),
  
  getProjectById: (id) => apiRequest(`/projects/${id}`),
  
  createProject: (data) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateProject: (id, data) => apiRequest(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteProject: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE'
  })
};

// Skills API
export const skillsAPI = {
  getSkills: () => apiRequest('/skills'),
  
  getTopSkills: () => apiRequest('/skills/top'),
  
  getSkillById: (id) => apiRequest(`/skills/${id}`),
  
  createSkill: (data) => apiRequest('/skills', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateSkill: (id, data) => apiRequest(`/skills/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteSkill: (id) => apiRequest(`/skills/${id}`, {
    method: 'DELETE'
  })
};

// Education API
export const educationAPI = {
  getEducation: () => apiRequest('/education'),
  
  getEducationById: (id) => apiRequest(`/education/${id}`),
  
  createEducation: (data) => apiRequest('/education', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateEducation: (id, data) => apiRequest(`/education/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteEducation: (id) => apiRequest(`/education/${id}`, {
    method: 'DELETE'
  })
};

// Work Experience API
export const workAPI = {
  getWorkExperience: () => apiRequest('/work'),
  
  getWorkExperienceById: (id) => apiRequest(`/work/${id}`),
  
  createWorkExperience: (data) => apiRequest('/work', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  updateWorkExperience: (id, data) => apiRequest(`/work/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  deleteWorkExperience: (id) => apiRequest(`/work/${id}`, {
    method: 'DELETE'
  })
};

// Search API
export const searchAPI = {
  search: (query) => apiRequest(`/search?q=${encodeURIComponent(query)}`)
};

// Health Check API
export const healthAPI = {
  checkHealth: () => apiRequest('/health')
};
