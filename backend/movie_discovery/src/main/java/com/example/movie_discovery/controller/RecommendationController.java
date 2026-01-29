package com.example.movie_discovery.controller;

import com.example.movie_discovery.service.RecommendationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@CrossOrigin
public class RecommendationController {

    private final RecommendationService service;

    public RecommendationController(RecommendationService service) {
        this.service = service;
    }

    @GetMapping("/for-you")
    public Object forYou() {
        return service.personalized();
    }

    @GetMapping("/trending-collections")
    public Object collections() {
        return service.trendingCollections();
    }

    @GetMapping("/by-actor/{actor}")
    public Object byActor(@PathVariable String actor) {
        return service.byActor(actor);
    }
}


// package com.example.movie_discovery.controller;

// import com.example.movie_discovery.service.RecommendationService;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/recommendations")
// @CrossOrigin
// public class RecommendationController {

//     private final RecommendationService service;

//     public RecommendationController(RecommendationService service) {
//         this.service = service;
//     }

//     @GetMapping("/for-you")
//     public Object forYou() {
//         return service.personalized();
//     }

//     @GetMapping("/trending-collections")
//     public Object collections() {
//         return service.trendingCollections();
//     }

//     @GetMapping("/by-actor/{actor}")
//     public Object byActor(@PathVariable String actor) {
//         return service.byActor(actor);
//     }
// }
