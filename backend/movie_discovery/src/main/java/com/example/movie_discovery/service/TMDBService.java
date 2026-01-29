package com.example.movie_discovery.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.movie_discovery.config.TmdbConfig;
@Service
public class TMDBService {

    private final RestTemplate restTemplate;
    private final TmdbConfig config;

    public TMDBService(TmdbConfig config) {
        this.config = config;
        this.restTemplate = new RestTemplate();
    }

    public String getTrendingMovies() {
        try {
            String url = config.getBaseUrl()
                    + "/trending/movie/week?api_key="
                    + config.getApiKey();

            return restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch trending movies\", \"results\": []}";
        }
    }

    public String getNewReleases() {
        try {
            String url = config.getBaseUrl()
                    + "/movie/now_playing?api_key="
                    + config.getApiKey();

            return restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch new releases\", \"results\": []}";
        }
    }
    public String getMovieById(Long movieId) {
        try {
            String url = config.getBaseUrl()
                    + "/movie/" + movieId
                    + "?api_key=" + config.getApiKey();

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch movie details\"}";
        }
    }
    public String searchMovies(String query) {
        try {
            String url = config.getBaseUrl()
                    + "/search/movie?api_key="
                    + config.getApiKey()
                    + "&query=" + query;

            return restTemplate.getForObject(url, String.class);

        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to search movies\", \"results\": []}";
        }
    }
    public String getMovieCredits(Long id) {
        try {
            String url = config.getBaseUrl()
                + "/movie/" + id + "/credits"
                + "?api_key=" + config.getApiKey();

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch movie credits\", \"cast\": [], \"crew\": []}";
        }
    }

    public String getSimilarMovies(Long id) {
        try {
            String url = config.getBaseUrl()
                + "/movie/" + id + "/similar"
                + "?api_key=" + config.getApiKey();

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch similar movies\", \"results\": []}";
        }
    }
    public String getMoviesByLanguage(String languageCode) {
        try {
            String url = config.getBaseUrl() +
                    "/discover/movie" +
                    "?api_key=" + config.getApiKey() +
                    "&with_original_language=" + languageCode +
                    "&region=IN" +
                    "&sort_by=popularity.desc";

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch movies by language\", \"results\": []}";
        }
    }

    public String getWatchProviders(Long id) {
        try {
            String url = config.getBaseUrl()
                + "/movie/" + id + "/watch/providers"
                + "?api_key=" + config.getApiKey();

            return restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            e.printStackTrace();
            return "{\"error\": \"Failed to fetch watch providers\", \"results\": {}}";
        }
    }

}

