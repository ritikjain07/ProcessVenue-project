import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProjectsPage from './pages/ProjectsPage';
import SearchPage from './pages/SearchPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Developer Profile</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/search">Search</Link></li>
          </ul>
        </nav>
      </header>
      
      <main className="app-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </main>
      
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Developer Profile</p>
      </footer>
    </div>
  );
}

export default App;
