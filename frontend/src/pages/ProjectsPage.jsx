import React, { useState, useEffect } from 'react';
import { projectsAPI, skillsAPI } from '../services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skillsData = await skillsAPI.getSkills();
        setSkills(skillsData);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    
    fetchSkills();
  }, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsData = await projectsAPI.getProjects(selectedSkill);
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [selectedSkill]);
  
  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };
  
  return (
    <div className="projects-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">My Projects</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="skill-filter" className="form-label">Filter by skill:</label>
            <select 
              id="skill-filter" 
              className="form-control" 
              value={selectedSkill} 
              onChange={handleSkillChange}
            >
              <option value="">All Skills</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>
          
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : projects.length === 0 ? (
            <p>No projects found. Try a different skill filter.</p>
          ) : (
            <div className="grid">
              {projects.map((project) => (
                <div key={project.id} className="card project-card">
                  <div className="card-header">
                    <h3 className="card-title">{project.title}</h3>
                  </div>
                  <div className="card-body project-card-body">
                    <p>{project.description}</p>
                    
                    {project.skills && project.skills.length > 0 && (
                      <div className="tag-list">
                        {project.skills.map((skill) => (
                          <span key={skill.id} className="tag">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="project-links">
                      {project.repository_url && (
                        <a href={project.repository_url} target="_blank" rel="noopener noreferrer">
                          Repository
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
