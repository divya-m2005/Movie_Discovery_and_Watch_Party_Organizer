// import { useDispatch, useSelector } from "react-redux";
// import { fetchSearch } from "../features/search/searchSlice";
// import { useState } from "react";
// import MovieCard from "../components/MovieCard";

// export default function Search() {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const results = useSelector((state) => state.search.results);

//   const handleSearch = () => {
//     dispatch(fetchSearch(query));
//   };

//   return (
//     <div className="container mt-4">
//       <input
//         className="form-control mb-3"
//         placeholder="Search movies..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />

//       <button className="btn btn-primary mb-3" onClick={handleSearch}>
//         Search
//       </button>

//       <div className="row">
//         {results.map((m) => (
//           <div className="col-md-3 mb-3" key={m.id}>
//             <MovieCard movie={m} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useDispatch, useSelector } from "react-redux";
import { fetchSearch } from "../features/search/searchSlice";
import { useState } from "react";
import MovieCard from "../components/MovieCard";

const genres = [
  { id: 28, name: "Action" },
  { id: 27, name: "Horror" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
];

export default function Search() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.search.results);

  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearch(query));
    }
  };

  return (
    <div className="container mt-4">
      {/* 🔍 Search Box */}
      <div className="d-flex justify-content-center mb-4">
        <input
          className="form-control form-control-lg w-50"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary ms-2 px-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* 🎭 Genre Filters */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {genres.map((g) => (
          <button
            key={g.id}
            className="btn btn-outline-light btn-sm"
            onClick={() => dispatch(fetchSearch(g.name))}
          >
            {g.name}
          </button>
        ))}
      </div>

      {/* 🎬 Movies */}
      <div className="row g-4 gy-5">
        {results.map((movie) => (
          <div className="col-md-3" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { fetchSearch } from "../features/search/searchSlice";
// import { useState } from "react";
// import MovieCard from "../components/MovieCard";

// const genres = [
//   { id: 0, name: "All Movies" },
//   { id: 28, name: "Action" },
//   { id: 27, name: "Horror" },
//   { id: 35, name: "Comedy" },
//   { id: 10749, name: "Romance" },
// ];

// export default function Search() {
//   const dispatch = useDispatch();
//   const results = useSelector((state) => state.search.results);

//   const [query, setQuery] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("All Movies");

//   const handleSearch = () => {
//     if (query.trim()) {
//       dispatch(fetchSearch(query));
//     }
//   };

//   const handleGenreSelect = (genre) => {
//     setSelectedGenre(genre.name);
//     dispatch(fetchSearch(genre.name)); // genre-based search
//   };

//   return (
//     <div className="container mt-4">
//       {/* 🔍 Search + Dropdown */}
//       <div className="d-flex justify-content-center align-items-center gap-2 mb-4 flex-wrap">
//         <input
//           className="form-control form-control-lg w-50"
//           placeholder="Search movies..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />

//         <button
//           className="btn btn-primary px-4"
//           onClick={handleSearch}
//         >
//           Search
//         </button>

//         {/* 🎭 Genre Dropdown */}
//         <div className="dropdown">
//           <button
//             className="btn btn-outline-light dropdown-toggle px-4"
//             type="button"
//             data-bs-toggle="dropdown"
//           >
//             {selectedGenre}
//           </button>

//           <ul className="dropdown-menu dropdown-menu-end">
//             {genres.map((g) => (
//               <li key={g.id}>
//                 <button
//                   className="dropdown-item"
//                   onClick={() => handleGenreSelect(g)}
//                 >
//                   {g.name}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* 🎬 Movies */}
//       <div className="row g-4 gy-5">
//         {results.map((movie) => (
//           <div className="col-md-3" key={movie.id}>
//             <MovieCard movie={movie} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
