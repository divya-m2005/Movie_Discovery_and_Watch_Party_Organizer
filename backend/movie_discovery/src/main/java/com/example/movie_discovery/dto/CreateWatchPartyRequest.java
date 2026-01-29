package com.example.movie_discovery.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class CreateWatchPartyRequest {

    private Long movieId;
    private LocalDate watchDate;
    private LocalTime watchTime;
    private String description;
    private Integer maxMembers;

    // getters & setters
    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public LocalDate getWatchDate() {
        return watchDate;
    }

    public void setWatchDate(LocalDate watchDate) {
        this.watchDate = watchDate;
    }

    public LocalTime getWatchTime() {
        return watchTime;
    }

    public void setWatchTime(LocalTime watchTime) {
        this.watchTime = watchTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMaxMembers() {
        return maxMembers;
    }

    public void setMaxMembers(Integer maxMembers) {
        this.maxMembers = maxMembers;
    }
}
