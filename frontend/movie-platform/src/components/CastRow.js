import React from 'react';
import './CastRow.css';

const CastRow = ({ cast }) => {
  return (
    <div className="cast-section">
      <h3 className="cast-title">Cast</h3>
      <div className="cast-row">
        {cast.slice(0, 5).map((person) => (
          <div key={person.id} className="cast-card">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : 'https://via.placeholder.com/100x100/cccccc/666666?text=No+Image'
              }
              alt={person.name}
              className="cast-image"
            />
            <p className="cast-name">{person.name}</p>
            <p className="cast-character">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastRow;