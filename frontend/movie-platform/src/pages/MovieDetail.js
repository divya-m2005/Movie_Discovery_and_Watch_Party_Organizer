
// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams, useNavigate } from "react-router-dom";
// // import {
// //   fetchMovie,
// //   fetchCredits,
// //   fetchSimilar,
// // } from "../features/movies/movieSlice";
// // import { addWatchlist, fetchWatchlist } from "../features/watchlist/watchlistSlice";
// // import Loader from "../components/Loader";

// // export default function MovieDetail() {
// //   const { id } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   // Movies state
// //   const { movie, cast, similar, loading } = useSelector(
// //     (state) => state.movies
// //   );

// //   // Watchlist state
// //   const list = useSelector((state) => state.watchlist.items);

// //   useEffect(() => {
// //     dispatch(fetchMovie(id));
// //     dispatch(fetchCredits(id));
// //     dispatch(fetchSimilar(id));
// //     dispatch(fetchWatchlist()); // load watchlist
// //   }, [dispatch, id]);

// //   if (loading) return <Loader />;
// //   if (!movie) return null;

// //   // Check if movie already in watchlist
// //   const isInWatchlist = list.some((m) => m.movieId === movie.id);

// //   // Add to watchlist handler
// //   const handleAddWatchlist = () => {
// //     if (!isInWatchlist) {
// //       dispatch(addWatchlist(movie.id));
// //     }
// //   };

// //   return (
// //     <div className="container mt-5 movie-detail text-dark">
// //       <div className="row">
// //         {/* POSTER */}
// //         <div className="col-md-4">
// //           <img
// //             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// //             className="img-fluid rounded"
// //             alt={movie.title}
// //           />
// //         </div>

// //         {/* INFO */}
// //         <div className="col-md-8">
// //           <h2>{movie.title}</h2>
// //           {movie.tagline && (
// //             <p className="text-muted">{movie.tagline}</p>
// //           )}

// //           <p>{movie.overview}</p>

// //           <p>⭐ <strong>Rating:</strong> {movie.vote_average}</p>
// //           <p>📅 <strong>Release:</strong> {movie.release_date}</p>
// //           <p>⏱ <strong>Runtime:</strong> {movie.runtime} min</p>

// //           {/* GENRES */}
// //           <div className="mt-3">
// //             {movie.genres?.map((g) => (
// //               <span key={g.id} className="badge bg-secondary me-2">
// //                 {g.name}
// //               </span>
// //             ))}
// //           </div>

// //           {/* ACTION BUTTONS */}
// //           <div className="mt-3 d-flex gap-2">
// //             <button
// //               className="btn btn-primary"
// //               onClick={handleAddWatchlist}
// //               disabled={isInWatchlist}
// //             >
// //               {isInWatchlist ? "Added" : "Add to Watchlist"}
// //             </button>
// //             <button className="btn btn-success">Create Watch Party</button>
// //             <button className="btn btn-outline-secondary">Share</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CAST & CREW */}
// //       {cast.length > 0 && (
// //         <section className="mt-5">
// //           <h4 className="section-title">Cast & Crew</h4>
// //           <div className="cast-row">
// //             {cast.slice(0, 10).map((person) => (
// //               <div className="cast-card" key={person.id}>
// //                 <img
// //                   src={
// //                     person.profile_path
// //                       ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
// //                       : "/no-avatar.png"
// //                   }
// //                   alt={person.name}
// //                 />
// //                 <p className="name">{person.name}</p>
// //                 <p className="character">{person.character}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       )}

// //       {/* SIMILAR MOVIES */}
// //       {similar.length > 0 && (
// //         <section className="mt-5">
// //           <h4 className="section-title">Similar Movies</h4>
// //           <div className="similar-row">
// //             {similar.map((m) => (
// //               <div
// //                 className="similar-card"
// //                 key={m.id}
// //                 onClick={() => navigate(`/movie/${m.id}`)}
// //               >
// //                 <img
// //                   src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
// //                   alt={m.title}
// //                 />
// //                 <p>{m.title}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       )}
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   fetchMovie,
//   fetchCredits,
//   fetchSimilar,
// } from "../features/movies/movieSlice";
// import { addWatchlist, fetchWatchlist } from "../features/watchlist/watchlistSlice";
// import Loader from "../components/Loader";

// export default function MovieDetail() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Movies state
//   const { movie, cast, similar, loading } = useSelector(
//     (state) => state.movies
//   );

//   // Watchlist state
//   const list = useSelector((state) => state.watchlist.items);

//   // Success message state
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     dispatch(fetchMovie(id));
//     dispatch(fetchCredits(id));
//     dispatch(fetchSimilar(id));
//     dispatch(fetchWatchlist()); // load watchlist
//   }, [dispatch, id]);

//   if (loading) return <Loader />;
//   if (!movie) return null;

//   // Check if movie already in watchlist
//   const isInWatchlist = list.some((m) => m.movieId === movie.id);

//   // // Add to watchlist handler
//   // const handleAddWatchlist = () => {
//   //   if (!isInWatchlist) {
//   //     dispatch(addWatchlist(movie.id))
//   //       .unwrap()
//   //       .then(() => {
//   //         setSuccessMessage("✅ Successfully added to Watchlist!");
//   //         // hide after 3 seconds
//   //         setTimeout(() => setSuccessMessage(""), 3000);
//   //       });
//   //   }
//   // };
//   const handleAddWatchlist = async () => {
//   if (!isInWatchlist) {
//     try {
//       await dispatch(addWatchlist(movie)).unwrap();
//       setSuccessMessage("✅ Successfully added to Watchlist!");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     } catch (error) {
//       console.error("Failed to add:", error);
//       setSuccessMessage("⚠️ Failed to add to Watchlist");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     }
//   }
// };


//   return (
//     <div className="container mt-5 movie-detail text-dark">
//       {/* SUCCESS ALERT */}
//       {successMessage && (
//         <div className="alert alert-success" role="alert">
//           {successMessage}
//         </div>
//       )}

//       <div className="row">
//         {/* POSTER */}
//         <div className="col-md-4">
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             className="img-fluid rounded"
//             alt={movie.title}
//           />
//         </div>

//         {/* INFO */}
//         <div className="col-md-8">
//           <h2>{movie.title}</h2>
//           {movie.tagline && <p className="text-muted">{movie.tagline}</p>}

//           <p>{movie.overview}</p>

//           <p>⭐ <strong>Rating:</strong> {movie.vote_average}</p>
//           <p>📅 <strong>Release:</strong> {movie.release_date}</p>
//           <p>⏱ <strong>Runtime:</strong> {movie.runtime} min</p>

//           {/* GENRES */}
//           <div className="mt-3">
//             {movie.genres?.map((g) => (
//               <span key={g.id} className="badge bg-secondary me-2">
//                 {g.name}
//               </span>
//             ))}
//           </div>

//           {/* ACTION BUTTONS */}
//           <div className="mt-3 d-flex gap-2">
//             <button
//               className="btn btn-primary"
//               onClick={handleAddWatchlist}
//               disabled={isInWatchlist}
//             >
//               {isInWatchlist ? "Added" : "Add to Watchlist"}
//             </button>
//             <button className="btn btn-success">Create Watch Party</button>
//             <button className="btn btn-outline-secondary">Share</button>
//           </div>
//         </div>
//       </div>

//       {/* CAST & CREW */}
//       {cast.length > 0 && (
//         <section className="mt-5">
//           <h4 className="section-title">Cast & Crew</h4>
//           <div className="cast-row">
//             {cast.slice(0, 10).map((person) => (
//               <div className="cast-card" key={person.id}>
//                 <img
//                   src={
//                     person.profile_path
//                       ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
//                       : "/no-avatar.png"
//                   }
//                   alt={person.name}
//                 />
//                 <p className="name">{person.name}</p>
//                 <p className="character">{person.character}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* SIMILAR MOVIES */}
//       {similar.length > 0 && (
//         <section className="mt-5">
//           <h4 className="section-title">Similar Movies</h4>
//           <div className="similar-row">
//             {similar.map((m) => (
//               <div
//                 className="similar-card"
//                 key={m.id}
//                 onClick={() => navigate(`/movie/${m.id}`)}
//               >
//                 <img
//                   src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
//                   alt={m.title}
//                 />
//                 <p>{m.title}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import CastRow from "../components/CastRow";
import MovieRow from "../components/MovieRow";

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { addToWatchlist, isInWatchlist } = useWatchlist();
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMovieData();
  }, [movieId]);

  const fetchMovieData = async () => {
    try {
      const movieRes = await fetch(`http://localhost:8082/api/movies/${movieId}`);
      
      if (movieRes.ok) {
        const movieText = await movieRes.text();
        console.log('Movie response:', movieText);
        
        try {
          const movieData = JSON.parse(movieText);
          setMovie(movieData);
          
          // Fetch cast and similar movies
          const [castRes, similarRes] = await Promise.all([
            fetch(`http://localhost:8082/api/movies/${movieId}/credits`),
            fetch(`http://localhost:8082/api/movies/${movieId}/similar`)
          ]);
          
          if (castRes.ok) {
            const castText = await castRes.text();
            const castData = JSON.parse(castText);
            setCast(castData.cast || []);
          }
          
          if (similarRes.ok) {
            const similarText = await similarRes.text();
            const similarData = JSON.parse(similarText);
            setSimilarMovies(similarData.results || []);
          }
          
        } catch (e) {
          console.error('Failed to parse movie JSON:', e);
        }
      } else {
        console.error('Movie API failed:', movieRes.status, await movieRes.text());
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!isInWatchlist(movie.id)) {
      const success = await addToWatchlist(movie);
      if (success) {
        setMessage("✅ Added to Watchlist!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("⚠️ Failed to add to Watchlist");
        setTimeout(() => setMessage(""), 3000);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage("🔗 Link copied to clipboard!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleCreateWatchParty = () => {
    // Navigate to existing watch party flow
    navigate('/create-party', { state: { movie } });
  };

  if (loading) {
    return <div className="container mt-4"><h4>Loading movie details...</h4></div>;
  }

  if (!movie) {
    return <div className="container mt-4"><h4>Movie not found</h4></div>;
  }

  return (
    <div className="container mt-4">
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}

      <div className="row">
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded"
            alt={movie.title}
          />
        </div>

        <div className="col-md-8">
          <h2>{movie.title}</h2>
          {movie.tagline && <p className="text-muted">{movie.tagline}</p>}
          
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <p><strong>Rating:</strong> ⭐ {movie.vote_average}/10</p>
          
          <p>{movie.overview}</p>

          <div className="mb-3">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="badge bg-secondary me-2">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-primary"
              onClick={handleAddToWatchlist}
              disabled={isInWatchlist(movie.id)}
            >
              {isInWatchlist(movie.id) ? "Added to Watchlist" : "Add to Watchlist"}
            </button>
            <button className="btn btn-outline-secondary" onClick={handleShare}>
              Share
            </button>
            <button className="btn btn-success" onClick={handleCreateWatchParty}>
              Create Watch Party
            </button>
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <div className="mt-5">
          <CastRow cast={cast} />
        </div>
      )}

      {similarMovies.length > 0 && (
        <div className="mt-5">
          <MovieRow title="Similar Cast Movies" movies={similarMovies} itemsPerRow={4} />
        </div>
      )}

      {genreMovies.length > 0 && (
        <div className="mt-5">
          <MovieRow title="Similar Genre Movies" movies={genreMovies} itemsPerRow={4} />
        </div>
      )}
    </div>
  );
}