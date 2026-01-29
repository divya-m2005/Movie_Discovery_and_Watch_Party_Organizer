import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PartyInvite.css';

const PartyInvite = () => {
  const { partyCode } = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState(null);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetchPartyDetails();
  }, [partyCode]);

  const fetchPartyDetails = async () => {
    try {
      // Mock party data - replace with real API call
      const mockParty = {
        partyId: partyCode,
        partyCode: partyCode,
        movieId: 1054867, // Elemental movie ID
        watchDate: '2024-01-15',
        watchTime: '20:00',
        description: 'Join us for movie night!',
        maxMembers: 10,
        currentMembers: 3
      };
      
      setParty(mockParty);
      
      // Fetch real movie details
      try {
        const movieRes = await fetch(`http://localhost:8082/api/movies/${mockParty.movieId}`);
        if (movieRes.ok) {
          const movieText = await movieRes.text();
          const movieData = JSON.parse(movieText);
          setMovie(movieData);
          
          // Fetch cast
          const castRes = await fetch(`http://localhost:8082/api/movies/${mockParty.movieId}/credits`);
          if (castRes.ok) {
            const castText = await castRes.text();
            const castData = JSON.parse(castText);
            setCast(castData.cast?.slice(0, 6) || []);
          }
        } else {
          throw new Error('Movie API failed');
        }
      } catch (movieError) {
        // Fallback movie data
        setMovie({
          id: mockParty.movieId,
          title: 'Elemental',
          poster_path: '/6oH378KUfCEitzJkm07r97L0RsZ.jpg',
          backdrop_path: '/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg',
          vote_average: 7.7,
          overview: 'In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.',
          genres: [{id: 16, name: 'Animation'}, {id: 35, name: 'Comedy'}, {id: 10751, name: 'Family'}],
          release_date: '2023-06-14',
          runtime: 102
        });
      }
    } catch (error) {
      console.error('Error fetching party details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (interested) => {
    if (interested) {
      const watchDateTime = new Date(party.watchDate + 'T' + party.watchTime);
      const reminderTime = new Date(watchDateTime.getTime() - 30 * 60000);
      
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            const timeUntilReminder = reminderTime.getTime() - Date.now();
            if (timeUntilReminder > 0) {
              setTimeout(() => {
                new Notification('🎬 Watch Party Reminder', {
                  body: `"${movie.title}" starts in 30 minutes!`,
                  icon: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null
                });
              }, timeUntilReminder);
            }
          }
        });
      }
      setResponse('accepted');
    } else {
      setResponse('declined');
    }
  };

  if (loading) return <div className="loading">Loading invitation...</div>;
  if (!party || !movie) return <div className="error">Party not found</div>;

  return (
    <div className="party-invite">
      {/* Movie Hero Section */}
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
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : '/placeholder-movie.png'}
              alt={movie.title}
              className="movie-poster-large"
            />
          </div>
          
          <div className="movie-info-section">
            <h1 className="invite-title">🎉 You're Invited to Watch</h1>
            <h2 className="movie-title">{movie.title}</h2>
            
            <div className="movie-meta">
              <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
              <span>📅 {movie.release_date?.split('-')[0]}</span>
              <span>⏱️ {movie.runtime} min</span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <p className="movie-overview">{movie.overview}</p>

            <div className="party-info">
              <h3>🎬 Party Details</h3>
              <p><strong>📅 Date:</strong> {new Date(party.watchDate).toLocaleDateString()}</p>
              <p><strong>⏰ Time:</strong> {party.watchTime}</p>
              <p><strong>👥 Members:</strong> {party.currentMembers}/{party.maxMembers}</p>
              {party.description && <p><strong>📝 Note:</strong> {party.description}</p>}
            </div>

            {!response ? (
              <div className="response-buttons">
                <button 
                  className="btn btn-success"
                  onClick={() => handleResponse(true)}
                >
                  😍 Interested
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleResponse(false)}
                >
                  😐 Not Interested
                </button>
              </div>
            ) : (
              <div className="response-message">
                {response === 'accepted' ? (
                  <div className="accepted">
                    <h3>🎊 Great! You're interested!</h3>
                    <p>We'll remind you 30 minutes before the movie starts.</p>
                    <p><strong>Watch Time:</strong> {new Date(party.watchDate + 'T' + party.watchTime).toLocaleString()}</p>
                  </div>
                ) : (
                  <div className="declined">
                    <h3>😔 Maybe next time!</h3>
                    <p>You declined this invitation.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
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
      )}
    </div>
  );
};

export default PartyInvite;