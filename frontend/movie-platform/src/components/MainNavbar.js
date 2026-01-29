import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './MainNavbar.css';

const MainNavbar = ({ onCreateWatchParty }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          🎬 MovieDiscover
        </Link>

        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            🏠 Home
          </Link>
          
          {user?.role === 'creator' && (
            <>
              <Link 
                to="/watchlist" 
                className={`nav-item ${isActive('/watchlist') ? 'active' : ''}`}
              >
                📋 Watchlist
              </Link>
              
              <Link 
                to="/watch-party" 
                className={`nav-item ${isActive('/watch-party') ? 'active' : ''}`}
              >
                🎉 Watch Party
              </Link>

              <Link 
                to="/watch-history" 
                className={`nav-item ${isActive('/watch-history') ? 'active' : ''}`}
              >
                📺 Watch History
              </Link>
            </>
          )}
          
          {user?.role === 'receiver' && (
            <span className="receiver-badge">
              👥 Guest Access
            </span>
          )}

          <div className="profile-section">
            <button 
              className="profile-button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              👤 {user?.username || 'Profile'}
            </button>
            
            {showProfileMenu && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <span>{user?.email}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;