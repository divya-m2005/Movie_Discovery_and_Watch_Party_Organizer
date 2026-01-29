import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import MainNavbar from '../components/MainNavbar';
import MovieGrid from '../components/MovieGrid';
import WatchPartyModal from '../components/WatchPartyModal';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [watchlist, setWatchlist] = useState([]);
  const [showWatchPartyModal, setShowWatchPartyModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
    fetchWatchlist();
  }, [selectedLanguage]);

  useEffect(() => {
    filterMovies();
  }, [movies, searchQuery, selectedGenre, selectedLanguage]);

  const fetchMovies = async () => {
    try {
      let url = 'http://localhost:8082/api/movies/trending';
      
      // If a specific language is selected, fetch movies by language
      if (selectedLanguage !== 'All') {
        const langCode = getLanguageCode(selectedLanguage);
        if (langCode) {
          url = `http://localhost:8082/api/movies/by-language/${langCode}`;
        }
      }
      
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setMovies(data.results || []);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist?userId=${user?.userId || 1}`);
      if (response.ok) {
        const data = await response.json();
        setWatchlist(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };

  const searchMovies = async (query) => {
    if (!query.trim()) {
      fetchMovies();
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8082/api/movies/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        setMovies(data.results || []);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const filterMovies = () => {
    let filtered = movies;

    if (selectedGenre !== 'All') {
      filtered = filtered.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(getGenreId(selectedGenre))
      );
    }

    if (selectedLanguage !== 'All') {
      const langCode = getLanguageCode(selectedLanguage);
      if (langCode) {
        filtered = filtered.filter(movie => 
          movie.original_language === langCode
        );
      }
    }

    setFilteredMovies(filtered);
  };

  const getGenreId = (genre) => {
    const genreMap = {
      'Horror': 27,
      'Action': 28,
      'Love': 10749
    };
    return genreMap[genre];
  };

  const getLanguageCode = (language) => {
    const langMap = {
      'English': 'en',
      'Spanish': 'es',
      'French': 'fr',
      'Tamil': 'ta'
    };
    return langMap[language];
  };

  const addToWatchlist = async (movie) => {
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist?movieId=${movie.id}`, {
        method: 'POST'
      });
      if (response.ok) {
        setWatchlist(prev => [...prev, movie]);
        return true;
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
    return false;
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some(movie => movie.id === movieId);
  };

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="dashboard">
      <MainNavbar onCreateWatchParty={() => setShowWatchPartyModal(true)} />
      
      <div className="dashboard-content">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchMovies(e.target.value);
            }}
            className="search-input"
          />
          
          <select 
            value={selectedGenre} 
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Genres</option>
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Love">Romance</option>
          </select>
          
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Languages</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="Tamil">Tamil</option>
          </select>
        </div>

        <MovieGrid 
          movies={filteredMovies}
          watchlist={watchlist}
          onAddToWatchlist={addToWatchlist}
          isInWatchlist={isInWatchlist}
        />
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

export default Dashboard;