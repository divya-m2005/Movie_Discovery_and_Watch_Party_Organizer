import { useEffect, useState } from "react";
import MovieRow from "../components/MovieRow";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // Test with a simpler endpoint first
      const trendingRes = await fetch('http://localhost:8082/api/movies/trending');
      
      if (trendingRes.ok) {
        const trendingText = await trendingRes.text();
        console.log('Raw trending response:', trendingText);
        
        try {
          const trendingData = JSON.parse(trendingText);
          setTrendingMovies(trendingData.results || trendingData || []);
        } catch (e) {
          console.error('Failed to parse trending JSON:', e);
          // If it's a string response from TMDB, try to use it directly
          if (trendingText.includes('results')) {
            const parsed = JSON.parse(trendingText);
            setTrendingMovies(parsed.results || []);
          }
        }
      } else {
        console.error('Trending API failed:', trendingRes.status, await trendingRes.text());
      }

      // For now, let's use the same data for both sections
      setNewReleases([]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mt-4"><h4>Loading movies...</h4></div>;
  }

  return (
    <div className="container mt-4">
      <MovieRow title="🔥 Top Trending Movies" movies={trendingMovies} />
      <MovieRow title="🎆 Newly Released Movies" movies={newReleases} />
    </div>
  );
}
