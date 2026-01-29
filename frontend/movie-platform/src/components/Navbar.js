import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ 
  user, 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  selectedGenre, 
  setSelectedGenre,
  selectedLanguage,
  setSelectedLanguage,
  onCreateWatchParty 
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <h2>🎬 MovieDiscover</h2>
      </div>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">🔍</button>
      </form>

      <div className="filters">
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Genres</option>
          <option value="Horror">Horror</option>
          <option value="Action">Action</option>
          <option value="Love">Romance</option>
        </select>

        <select 
          value={selectedLanguage} 
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Languages</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </div>

      <button 
        className="btn btn-success"
        onClick={onCreateWatchParty}
      >
        Create Watch Party
      </button>

      <div className="profile-section">
        <button 
          className="profile-btn"
          onClick={() => setShowProfile(!showProfile)}
        >
          👤 {user?.username || user?.email}
        </button>
        
        {showProfile && (
          <div className="profile-dropdown">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
