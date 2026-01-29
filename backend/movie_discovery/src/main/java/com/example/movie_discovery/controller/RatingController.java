package com.example.movie_discovery.controller;

import com.example.movie_discovery.service.RatingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin
public class RatingController {

    private final RatingService service;

    public RatingController(RatingService service) {
        this.service = service;
    }

    @GetMapping("/{movieId}")
    public Object getRatings(@PathVariable Long movieId) {
        return service.getRatings(movieId);
    }

    @PostMapping("/{movieId}")
    public Object rate(@PathVariable Long movieId,
                       @RequestBody Object req) {
        return service.addRating(1L, movieId, req);
    }

    @PutMapping("/{movieId}")
    public Object update(@PathVariable Long movieId,
                         @RequestBody Object req) {
        return service.updateRating(1L, movieId, req);
    }
}
