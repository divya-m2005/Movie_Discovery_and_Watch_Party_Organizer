package com.example.movie_discovery.repository;

import com.example.movie_discovery.model.WatchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {

    List<WatchHistory> findByUserId(Long userId);
}
