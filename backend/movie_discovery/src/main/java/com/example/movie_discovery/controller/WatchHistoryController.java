package com.example.movie_discovery.controller;

import com.example.movie_discovery.service.WatchHistoryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class WatchHistoryController {

    private final WatchHistoryService service;

    public WatchHistoryController(WatchHistoryService service) {
        this.service = service;
    }

    @GetMapping("/watch-history")
    public Object history() {
        return service.getHistory(1L);
    }

    @PostMapping("/watch-history")
    public Object add(@RequestParam Long movieId) {
        return service.addHistory(1L, movieId);
    }
}
