import React, { useState, useEffect } from 'react';
import { profileAPI, educationAPI, workAPI, skillsAPI } from '../services/api';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [education, setEducation] = useState([]);
  const [work, setWork] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileData, educationData, workData, skillsData] = await Promise.all([
          profileAPI.getProfile(),
          educationAPI.getEducation(),
          workAPI.getWorkExperience(),
          skillsAPI.getSkills()
        ]);
        
        setProfile(profileData);
        setEducation(educationData);
        setWork(workData);
        setSkills(skillsData);
        setError(null);
      } catch (err) {
        setError('Failed to load profile data. Please try again later.');
        console.error('Error fetching profile data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfileData();
  }, []);
  
  if (loading) {
    return <div className="loading">Loading profile data...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!profile) {
    return <div className="error">Profile not found.</div>;
  }
  
  return (
    <div className="profile-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{profile.name}</h2>
          <p>{profile.email}</p>
        </div>
        <div className="card-body">
          <p>{profile.bio}</p>
          
          <div className="profile-links" style={{ marginTop: '1.5rem' }}>
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>
                LinkedIn
              </a>
            )}
            {profile.portfolio_url && (
              <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Skills</h3>
        </div>
        <div className="card-body">
          <div className="tag-list">
            {skills.map((skill) => (
              <span key={skill.id} className="tag" title={skill.proficiency}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Work Experience</h3>
        </div>
        <div className="card-body">
          {work.map((job) => (
            <div key={job.id} style={{ marginBottom: '1.5rem' }}>
              <h4>{job.role}</h4>
              <p><strong>{job.company_name}</strong></p>
              <p>{job.start_date} - {job.end_date || 'Present'}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Education</h3>
        </div>
        <div className="card-body">
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: '1.5rem' }}>
              <h4>{edu.degree} in {edu.field_of_study}</h4>
              <p><strong>{edu.institution}</strong></p>
              <p>{edu.start_date} - {edu.end_date || 'Present'}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
