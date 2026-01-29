package com.example.movie_discovery.controller;

import com.example.movie_discovery.service.WatchlistService;
import com.example.movie_discovery.service.TMDBService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin
public class WatchlistController {

    private final WatchlistService service;
    private final TMDBService tmdbService;
    private final ObjectMapper objectMapper;

    public WatchlistController(WatchlistService service, TMDBService tmdbService) {
        this.service = service;
        this.tmdbService = tmdbService;
        this.objectMapper = new ObjectMapper();
    }

    @GetMapping
    public List<Object> getWatchlist() {
        var watchlistItems = service.getWatchlist(1L);
        List<Object> movies = new ArrayList<>();
        
        for (var item : watchlistItems) {
            try {
                String movieJson = tmdbService.getMovieById(item.getMovieId());
                JsonNode movieNode = objectMapper.readTree(movieJson);
                movies.add(movieNode);
            } catch (Exception e) {
                // Skip movies that can't be fetched
            }
        }
        
        return movies;
    }

    @PostMapping
    public Object add(@RequestParam Long movieId) {
        return service.addMovie(1L, movieId);
    }

    @DeleteMapping("/{movieId}")
    public Object remove(@PathVariable Long movieId) {
        return service.removeMovie(1L, movieId);
    }
}
