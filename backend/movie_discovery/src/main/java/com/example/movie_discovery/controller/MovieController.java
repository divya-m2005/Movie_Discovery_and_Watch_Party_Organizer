package com.example.movie_discovery.controller;

import com.example.movie_discovery.service.TMDBService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.swagger.v3.oas.annotations.Operation;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    private final TMDBService tmdbService;

    public MovieController(TMDBService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/trending")
    public String trendingMovies() {
        return tmdbService.getTrendingMovies();
    }

    @GetMapping("/new-releases")
    public String newReleases() {
        return tmdbService.getNewReleases();
    }

    @GetMapping("/search")
    public String search(@RequestParam String query) {
        return tmdbService.searchMovies(query);
    }
    @GetMapping("/by-language/{lang}")
    public String moviesByLanguage(@PathVariable String lang) {
        return tmdbService.getMoviesByLanguage(lang);
    }
    @GetMapping("/{id}")
    public String movieDetails(@PathVariable Long id) {
        return tmdbService.getMovieById(id);
    }
    // @GetMapping("/{id}/credits")
    //     public String credits(@PathVariable Long id) {
    //         return tmdbService.getMovieCredits(id);
    //     }

   @Operation(summary = "Get cast & crew for a movie")
    @GetMapping("/{id}/credits")
    public String credits(@PathVariable Long id) {
        return tmdbService.getMovieCredits(id);
    }
    @GetMapping("/{id}/similar")
    public String similar(@PathVariable Long id) {
        return tmdbService.getSimilarMovies(id);
    }
    
    @GetMapping("/{id}/watch-providers")
    public String watchProviders(@PathVariable Long id) {
        return tmdbService.getWatchProviders(id);
    }
}
