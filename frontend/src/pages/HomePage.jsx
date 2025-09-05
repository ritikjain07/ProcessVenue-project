import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Welcome to My Developer Profile</h2>
        </div>
        <div className="card-body">
          <p>
            This is a showcase of my skills, projects, and experience as a developer.
            Use the navigation above to explore different sections.
          </p>
          
          <div style={{ marginTop: '2rem' }}>
            <h3>Quick Links</h3>
            <ul style={{ marginTop: '1rem', marginLeft: '1rem' }}>
              <li><Link to="/profile">View my profile</Link></li>
              <li><Link to="/projects">Browse my projects</Link></li>
              <li><Link to="/search">Search skills & projects</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
