package com.example.movie_discovery.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "movieId"})
    },
    indexes = {
        @Index(name = "idx_user_id", columnList = "userId"),
        @Index(name = "idx_status", columnList = "status")
    }
)
public class Watchlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long watchlistId;

    private Long userId;
    private Long movieId;

    private LocalDateTime addedAt;

    private String status; // PLANNING, WATCHED, DROPPED

    @Column(length = 1000)
    private String notes;

    public Watchlist(LocalDateTime addedAt, Long movieId, String notes, String status, Long userId, Long watchlistId) {
        this.addedAt = addedAt;
        this.movieId = movieId;
        this.notes = notes;
        this.status = status;
        this.userId = userId;
        this.watchlistId = watchlistId;
    }
    public Watchlist(){

    }
    public Long getWatchlistId() {
        return watchlistId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public LocalDateTime getAddedAt() {
        return addedAt;
    }

    public String getStatus() {
        return status;
    }

    public String getNotes() {
        return notes;
    }

    public void setWatchlistId(Long watchlistId) {
        this.watchlistId = watchlistId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public void setAddedAt(LocalDateTime addedAt) {
        this.addedAt = addedAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    
}
