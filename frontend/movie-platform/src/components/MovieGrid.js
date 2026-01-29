import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieGrid.css';

const MovieGrid = ({ movies, watchlist, onAddToWatchlist, isInWatchlist }) => {
  const navigate = useNavigate();

  const handleAddToWatchlist = async (movie, event) => {
    event.stopPropagation(); // Prevent navigation when clicking the button
    if (!isInWatchlist(movie.id)) {
      const success = await onAddToWatchlist(movie);
      if (success) {
        alert('Added to watchlist!');
      } else {
        alert('Failed to add to watchlist');
      }
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="movie-grid">
      {movies.length === 0 ? (
        <div className="no-movies">No movies found</div>
      ) : (
        movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.release_date?.split('-')[0]}</p>
              <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</p>
              
              <button
                className={`btn ${isInWatchlist(movie.id) ? 'btn-disabled' : 'btn-primary'}`}
                onClick={(e) => handleAddToWatchlist(movie, e)}
                disabled={isInWatchlist(movie.id)}
              >
                {isInWatchlist(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieGrid;