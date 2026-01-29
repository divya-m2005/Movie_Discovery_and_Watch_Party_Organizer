package com.example.movie_discovery.service;

import com.example.movie_discovery.model.WatchHistory;
import com.example.movie_discovery.repository.WatchHistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WatchHistoryService {

    private final WatchHistoryRepository repo;

    public WatchHistoryService(WatchHistoryRepository repo) {
        this.repo = repo;
    }

    public List<WatchHistory> getHistory(Long userId) {
        return repo.findByUserId(userId);
    }

    public WatchHistory addHistory(Long userId, Long movieId) {
        WatchHistory h = new WatchHistory();
        h.setUserId(userId);
        h.setMovieId(movieId);
        h.setWatchedAt(LocalDateTime.now());
        h.setCompleted(true);
        return repo.save(h);
    }
}