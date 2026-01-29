import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainNavbar from '../components/MainNavbar';
import WatchPartyModal from '../components/WatchPartyModal';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [watchProviders, setWatchProviders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [showPartyInvite, setShowPartyInvite] = useState(false);
  const [partyResponse, setPartyResponse] = useState(null);

  // Check if this is a party invitation
  const partyCode = searchParams.get('party');
  const isPartyInvite = !!partyCode;

  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
    fetchSimilarMovies();
    fetchWatchProviders();
    if (user) {
      checkWatchlistStatus();
    }
    
    // Handle party invite - require login
    if (isPartyInvite && !user) {
      // Store the intended destination
      localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
      navigate('/login');
      return;
    }
    
    if (isPartyInvite && user) {
      setShowPartyInvite(true);
    }
  }, [id, user, isPartyInvite, navigate]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/movies/${id}`);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setMovie(data);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieCredits = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/movies/${id}/credits`);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setCast(data.cast?.slice(0, 10) || []);
      }
    } catch (error) {
      console.error('Error fetching movie credits:', error);
    }
  };

  const fetchSimilarMovies = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/movies/${id}/similar`);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setSimilarMovies(data.results?.slice(0, 6) || []);
      }
    } catch (error) {
      console.error('Error fetching similar movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchProviders = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/movies/${id}/watch-providers`);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setWatchProviders(data.results?.US || null);
      }
    } catch (error) {
      console.error('Error fetching watch providers:', error);
    }
  };

  const checkWatchlistStatus = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/watchlist');
      if (response.ok) {
        const data = await response.json();
        const watchlist = Array.isArray(data) ? data : [];
        setIsInWatchlist(watchlist.some(movie => movie.id == id));
      }
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const addToWatchlist = async () => {
    if (isInWatchlist) return;
    
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist?movieId=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsInWatchlist(true);
        alert('✅ Added to watchlist!');
      } else {
        alert('❌ Failed to add to watchlist');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      alert('❌ Error adding to watchlist');
    }
  };

  const handleRating = async (rating) => {
    setUserRating(rating);
    try {
      const response = await fetch(`http://localhost:8082/api/movies/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
      });
      
      if (response.ok) {
        alert(`✅ Rated ${rating} stars!`);
      }
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handlePartyResponse = (interested) => {
    if (interested) {
      // Set reminder notification
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            // Mock party time - 30 minutes from now for demo
            const reminderTime = new Date(Date.now() + 30 * 60000);
            setTimeout(() => {
              new Notification('🎬 Watch Party Reminder', {
                body: `"${movie.title}" watch party starts soon!`,
                icon: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null
              });
            }, 30000); // 30 seconds for demo
          }
        });
      }
      setPartyResponse('accepted');
    } else {
      setPartyResponse('declined');
    }
  };

  const handleSimilarMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="movie-details">
      {user?.role === 'creator' ? (
        <MainNavbar onCreateWatchParty={() => setShowWatchPartyModal(true)} />
      ) : user?.role === 'receiver' ? (
        <MainNavbar />
      ) : (
        <nav className="guest-navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-brand">
              🎬 MovieDiscover
            </Link>
            <div className="guest-actions">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          </div>
        </nav>
      )}
      
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="movie-hero">
        <div className="movie-backdrop">
          {movie.backdrop_path && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="backdrop-image"
            />
          )}
          <div className="backdrop-overlay"></div>
        </div>

        <div className="movie-content">
          <div className="movie-poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-large"
            />
          </div>

          <div className="movie-info-section">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <span className="movie-id">ID: {movie.id}</span>
              <span className="release-year">{movie.release_date?.split('-')[0]}</span>
              <span className="runtime">{movie.runtime} min</span>
              <span className="rating">⭐ {movie.vote_average?.toFixed(1)}/10</span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <p className="movie-overview">{movie.overview}</p>

            <div className="action-buttons">
              {isPartyInvite && showPartyInvite && !partyResponse ? (
                <>
                  <div className="party-invite-banner">
                    <h3>🎉 You're invited to a watch party!</h3>
                    <p>Party Code: {partyCode}</p>
                  </div>
                  <button 
                    className="btn btn-success"
                    onClick={() => handlePartyResponse(true)}
                  >
                    😍 Interested
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handlePartyResponse(false)}
                  >
                    😐 Not Interested
                  </button>
                </>
              ) : isPartyInvite && partyResponse ? (
                <div className="party-response">
                  {partyResponse === 'accepted' ? (
                    <div className="response-accepted">
                      <h3>🎊 Great! You're interested!</h3>
                      <p>We'll remind you when it's time to watch!</p>
                    </div>
                  ) : (
                    <div className="response-declined">
                      <h3>😔 Maybe next time!</h3>
                      <p>You declined this invitation.</p>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className={`btn ${isInWatchlist ? 'btn-disabled' : 'btn-primary'}`}
                  onClick={addToWatchlist}
                  disabled={isInWatchlist}
                >
                  {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </button>
              )}
            </div>

            <div className="rating-section">
              <h4>Rate this movie</h4>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span 
                    key={star} 
                    className={`star ${
                      star <= (hoverRating || userRating) ? 'filled' : ''
                    }`}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              {userRating > 0 && (
                <p className="rating-text">You rated: {userRating}/5 stars</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {watchProviders && Object.keys(watchProviders).length > 0 ? (
        <div className="watch-providers-section">
          <h2>📺 Where to Watch</h2>
          <div className="providers-grid">
            {watchProviders.flatrate && watchProviders.flatrate.length > 0 && (
              <div className="provider-type">
                <h3>🎬 Stream</h3>
                <div className="providers">
                  {watchProviders.flatrate.map(provider => (
                    <div key={provider.provider_id} className="provider">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="provider-logo"
                      />
                      <span>{provider.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {watchProviders.rent && watchProviders.rent.length > 0 && (
              <div className="provider-type">
                <h3>💳 Rent</h3>
                <div className="providers">
                  {watchProviders.rent.map(provider => (
                    <div key={provider.provider_id} className="provider">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="provider-logo"
                      />
                      <span>{provider.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {watchProviders.buy && watchProviders.buy.length > 0 && (
              <div className="provider-type">
                <h3>🛍️ Buy</h3>
                <div className="providers">
                  {watchProviders.buy.map(provider => (
                    <div key={provider.provider_id} className="provider">
                      <img
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="provider-logo"
                      />
                      <span>{provider.provider_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="watch-providers-section">
          <h2>📺 Where to Watch</h2>
          <div className="no-providers">
            <p>😔 Streaming information not available for this movie</p>
          </div>
        </div>
      )}

      <div className="cast-section">
        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map(actor => (
            <div key={actor.id} className="cast-member">
              <img
                src={actor.profile_path 
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                  : '/placeholder-person.png'
                }
                alt={actor.name}
                className="cast-photo"
              />
              <div className="cast-info">
                <h4>{actor.name}</h4>
                <p>{actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="similar-movies-section">
        <h2>Similar Movies</h2>
        <div className="similar-movies-grid">
          {similarMovies.map(similarMovie => (
            <div 
              key={similarMovie.id} 
              className="similar-movie-card"
              onClick={() => handleSimilarMovieClick(similarMovie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                alt={similarMovie.title}
                className="similar-movie-poster"
              />
              <div className="similar-movie-info">
                <h4>{similarMovie.title}</h4>
                <p>⭐ {similarMovie.vote_average?.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
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

export default MovieDetails;