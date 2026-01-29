package com.example.movie_discovery.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(indexes = {
        @Index(name = "idx_tmdb_id", columnList = "tmdbId"),
        @Index(name = "idx_title", columnList = "title")
})
public class Movie {

    @Id
    private Long movieId;   // TMDb ID

    @Column(unique = true)
    private Integer tmdbId;

    private String title;
    private String originalTitle;

    @Column(length = 2000)
    private String plotSummary;

    private LocalDate releaseDate;
    private Integer runtime;

    @ElementCollection
    private List<String> genres;

    private String director;

    @ElementCollection
    private List<String> cast;

    private String productionCompany;

    private Double imdbRating;
    private Double userAverageRating;
    private Integer totalRatingsCount;

    @ElementCollection
    private List<String> languages;

    private String posterUrl;
    private String backdropUrl;

    private String contentRating;
    private Double popularityScore;

    private Boolean isTvShow;
    private Integer numberOfSeasons;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
