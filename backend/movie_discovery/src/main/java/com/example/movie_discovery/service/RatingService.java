package com.example.movie_discovery.service;

import com.example.movie_discovery.model.Rating;
import com.example.movie_discovery.repository.RatingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RatingService {

    private final RatingRepository repo;

    public RatingService(RatingRepository repo) {
        this.repo = repo;
    }

    public List<Rating> getRatings(Long movieId) {
        return repo.findByMovieId(movieId);
    }

    public Rating addRating(Long userId, Long movieId, Object req) {
        Rating r = new Rating();
        r.setUserId(userId);
        r.setMovieId(movieId);
        r.setRatingScore(4.5);
        r.setRatedAt(LocalDateTime.now());
        return repo.save(r);
    }

    public Rating updateRating(Long userId, Long movieId, Object req) {
        Rating r = repo.findByUserIdAndMovieId(userId, movieId).orElseThrow();
        r.setRatingScore(5.0);
        r.setUpdatedAt(LocalDateTime.now());
        return repo.save(r);
    }
}
