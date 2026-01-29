import React from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies, itemsPerRow = 4 }) => {
  return (
    <div className="movie-row">
      <h3 className="row-title">{title}</h3>
      <div className={`movies-grid grid-${itemsPerRow}`}>
        {movies.slice(0, itemsPerRow * 2).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;