import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import WatchPartyModal from '../components/WatchPartyModal';
import { useAuth } from '../context/AuthContext';
import './Watchlist.css';

const Watchlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist?userId=${user?.userId || 1}`);
      if (response.ok) {
        const data = await response.json();
        setWatchlist(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist/${movieId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setWatchlist(prev => prev.filter(movie => movie.id !== movieId));
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return <div className="loading">Loading watchlist...</div>;
  }

  return (
    <div className="watchlist-page">
      <MainNavbar onCreateWatchParty={() => setShowWatchPartyModal(true)} />
      
      <div className="watchlist-content">
        <h1>My Watchlist</h1>
        
        {watchlist.length === 0 ? (
          <div className="empty-watchlist">
            <h2>Your watchlist is empty</h2>
            <p>Add movies to your watchlist to see them here</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/dashboard')}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div key={movie.id} className="watchlist-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="watchlist-poster"
                  onClick={() => handleMovieClick(movie.id)}
                />
                <div className="watchlist-info">
                  <h3 
                    className="watchlist-title"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    {movie.title}
                  </h3>
                  <p className="watchlist-year">{movie.release_date?.split('-')[0]}</p>
                  <p className="watchlist-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
                  
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showWatchPartyModal && (
        <WatchPartyModal 
          onClose={() => setShowWatchPartyModal(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Watchlist;