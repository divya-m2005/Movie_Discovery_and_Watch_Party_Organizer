import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/watchlist');
      if (response.ok) {
        const data = await response.json();
        setWatchlist(Array.isArray(data) ? data : []);
      } else {
        console.log('Watchlist endpoint returned:', response.status);
        setWatchlist([]);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setWatchlist([]);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const response = await fetch(`http://localhost:8082/api/watchlist?movieId=${movie.id}`, {
        method: 'POST',
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

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      isInWatchlist,
      fetchWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};