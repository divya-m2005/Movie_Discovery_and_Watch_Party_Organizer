package com.example.movie_discovery.service;

import com.example.movie_discovery.config.TmdbConfig;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RecommendationService {

    @Autowired
    private TmdbConfig tmdbConfig;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Object byActor(String actor) {

        try {
            // STEP 1: Search actor
            String searchUrl = tmdbConfig.getBaseUrl()
                    + "/search/person?api_key="
                    + tmdbConfig.getApiKey()
                    + "&query=" + actor;

            String searchResponse = restTemplate.getForObject(searchUrl, String.class);

            JsonNode searchJson = objectMapper.readTree(searchResponse);
            int actorId = searchJson
                    .get("results")
                    .get(0)
                    .get("id")
                    .asInt();

            // STEP 2: Get movies
            String moviesUrl = tmdbConfig.getBaseUrl()
                    + "/person/" + actorId
                    + "/movie_credits?api_key="
                    + tmdbConfig.getApiKey();

            return restTemplate.getForObject(moviesUrl, Object.class);

        } catch (Exception e) {
            return "Actor not found";
        }
    }
    
    public Object personalized() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'personalized'");
    }

    public Object trendingCollections() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'trendingCollections'");
    }
}
