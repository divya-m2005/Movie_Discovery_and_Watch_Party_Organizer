package com.example.movie_discovery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(indexes = {
        @Index(name = "idx_user_id", columnList = "userId"),
        @Index(name = "idx_watched_at", columnList = "watchedAt")
})
public class WatchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    private Long userId;
    private Long movieId;

    private LocalDateTime watchedAt;
    private Integer watchDuration;

    private Boolean completed;

    private Long watchPartyId;

    @Column(length = 1000)
    private String notes;

    // ✅ No-args constructor
    public WatchHistory() {
    }

    // ✅ All-args constructor
    public WatchHistory(Long historyId, Long userId, Long movieId, LocalDateTime watchedAt,
                        Integer watchDuration, Boolean completed, Long watchPartyId, String notes) {
        this.historyId = historyId;
        this.userId = userId;
        this.movieId = movieId;
        this.watchedAt = watchedAt;
        this.watchDuration = watchDuration;
        this.completed = completed;
        this.watchPartyId = watchPartyId;
        this.notes = notes;
    }

    // ✅ Getters and Setters
    public Long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(Long historyId) {
        this.historyId = historyId;
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

    public LocalDateTime getWatchedAt() {
        return watchedAt;
    }

    public void setWatchedAt(LocalDateTime watchedAt) {
        this.watchedAt = watchedAt;
    }

    public Integer getWatchDuration() {
        return watchDuration;
    }

    public void setWatchDuration(Integer watchDuration) {
        this.watchDuration = watchDuration;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Long getWatchPartyId() {
        return watchPartyId;
    }

    public void setWatchPartyId(Long watchPartyId) {
        this.watchPartyId = watchPartyId;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}