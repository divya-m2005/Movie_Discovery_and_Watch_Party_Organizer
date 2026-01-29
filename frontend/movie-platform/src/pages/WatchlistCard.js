// import { useEffect, useState } from "react";
// // import { getMovieById } from "../api/tmdb";

// export default function WatchlistCard({ movieId, navigate }) {
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     getMovieById(movieId).then((res) => {
//       setMovie(JSON.parse(res));
//     });
//   }, [movieId]);

//   if (!movie) return null;

//   return (
//     <div className="col-md-3 mb-4">
//       <div
//         className="card h-100 watchlist-card"
//         onClick={() => navigate(`/movie/${movie.id}`)}
//       >
//         <img
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           className="card-img-top"
//           alt={movie.title}
//         />

//         <div className="card-body">
//           <h6 className="card-title">{movie.title}</h6>
//           <p className="text-muted small">
//             ⭐ {movie.vote_average}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import "./WatchlistCard.css";
export default function WatchlistCard({ movie, navigate }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className="card h-100 watchlist-card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />

        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <p className="text-muted small">
            ⭐ {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}
