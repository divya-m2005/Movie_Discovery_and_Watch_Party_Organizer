package com.example.movie_discovery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "movieId"})
    },
    indexes = {
        @Index(name = "idx_movie_id", columnList = "movieId"),
        @Index(name = "idx_rating_score", columnList = "ratingScore")
    }
)
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;

    private Long userId;
    private Long movieId;

    private Double ratingScore;   // 1–5
    private Integer numericRating; // 1–10 (optional)

    @Column(length = 500)
    private String reviewText;

    private Boolean hasSpoilers;
    private Boolean isPublic = true;

    private Integer helpfulCount = 0;

    private LocalDateTime ratedAt;
    private LocalDateTime updatedAt;

    // ✅ No-args constructor
    public Rating() {}

    // ✅ All-args constructor
    public Rating(Long ratingId, Long userId, Long movieId, Double ratingScore, Integer numericRating,
                  String reviewText, Boolean hasSpoilers, Boolean isPublic, Integer helpfulCount,
                  LocalDateTime ratedAt, LocalDateTime updatedAt) {
        this.ratingId = ratingId;
        this.userId = userId;
        this.movieId = movieId;
        this.ratingScore = ratingScore;
        this.numericRating = numericRating;
        this.reviewText = reviewText;
        this.hasSpoilers = hasSpoilers;
        this.isPublic = isPublic;
        this.helpfulCount = helpfulCount;
        this.ratedAt = ratedAt;
        this.updatedAt = updatedAt;
    }

    // ✅ Getters and Setters
    public Long getRatingId() {
        return ratingId;
    }

    public void setRatingId(Long ratingId) {
        this.ratingId = ratingId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Double getRatingScore() {
        return ratingScore;
    }

    public void setRatingScore(Double ratingScore) {
        this.ratingScore = ratingScore;
    }

    public Integer getNumericRating() {
        return numericRating;
    }

    public void setNumericRating(Integer numericRating) {
        this.numericRating = numericRating;
    }

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public Boolean getHasSpoilers() {
        return hasSpoilers;
    }

    public void setHasSpoilers(Boolean hasSpoilers) {
        this.hasSpoilers = hasSpoilers;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Integer getHelpfulCount() {
        return helpfulCount;
    }

    public void setHelpfulCount(Integer helpfulCount) {
        this.helpfulCount = helpfulCount;
    }

    public LocalDateTime getRatedAt() {
        return ratedAt;
    }

    public void setRatedAt(LocalDateTime ratedAt) {
        this.ratedAt = ratedAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
