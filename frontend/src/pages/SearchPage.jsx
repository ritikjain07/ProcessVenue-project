import React, { useState } from 'react';
import { searchAPI } from '../services/api';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const results = await searchAPI.search(searchQuery);
      setSearchResults(results);
      setSearched(true);
    } catch (err) {
      setError('Failed to perform search. Please try again later.');
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const renderResultItem = (item) => {
    let url = '#';
    let link = '';
    
    switch (item.type) {
      case 'profile':
        url = '/profile';
        link = 'View Profile';
        break;
      case 'project':
        if (item.url) {
          url = item.url;
          link = 'View Project';
        }
        break;
      case 'skill':
        url = `/projects?skill=${item.name}`;
        link = 'View Related Projects';
        break;
      default:
        break;
    }
    
    return (
      <div key={`${item.type}-${item.id}`} className="card">
        <div className="card-header">
          <h3 className="card-title">{item.name}</h3>
          <small>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</small>
        </div>
        <div className="card-body">
          {item.description && <p>{item.description}</p>}
          {url !== '#' && (
            <a href={url} style={{ display: 'inline-block', marginTop: '1rem' }}>
              {link}
            </a>
          )}
        </div>
      </div>
    );
  };
  
  return (
    <div className="search-page">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Search</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="search-input" className="form-label">Search for skills, projects, or information:</label>
              <div style={{ display: 'flex' }}>
                <input
                  id="search-input"
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter search terms..."
                  style={{ marginRight: '1rem' }}
                />
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
          
          {error && <div className="error">{error}</div>}
          
          {loading ? (
            <div className="loading">Searching...</div>
          ) : searched ? (
            searchResults.length === 0 ? (
              <p>No results found. Try a different search term.</p>
            ) : (
              <div style={{ marginTop: '2rem' }}>
                <h3>Search Results ({searchResults.length})</h3>
                <div style={{ marginTop: '1rem' }}>
                  {searchResults.map(renderResultItem)}
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
