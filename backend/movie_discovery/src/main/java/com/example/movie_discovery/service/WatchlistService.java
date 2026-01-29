package com.example.movie_discovery.service;

import com.example.movie_discovery.model.Watchlist;
import com.example.movie_discovery.repository.WatchlistRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WatchlistService {

    private final WatchlistRepository repo;

    public WatchlistService(WatchlistRepository repo) {
        this.repo = repo;
    }

    public List<Watchlist> getWatchlist(Long userId) {
        return repo.findByUserId(userId);
    }

    public Watchlist addMovie(Long userId, Long movieId) {
        Watchlist w = new Watchlist();
        w.setUserId(userId);
        w.setMovieId(movieId);
        w.setAddedAt(LocalDateTime.now());
        w.setStatus("PLANNING");
        return repo.save(w);
    }

    public String removeMovie(Long userId, Long movieId) {
        repo.findByUserIdAndMovieId(userId, movieId)
                .ifPresent(repo::delete);
        return "Removed from watchlist";
    }
}
