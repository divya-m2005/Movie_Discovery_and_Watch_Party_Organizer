package com.example.movie_discovery.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(indexes = {
        @Index(name = "idx_party_code", columnList = "partyCode"),
        @Index(name = "idx_status", columnList = "status")
})
public class WatchParty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long partyId;

    private Long organizerId;
    private Long movieId;

    @Column(unique = true)
    private String partyCode;

    private LocalDate watchDate;
    private LocalTime watchTime;

    private String description;

    private Integer maxMembers = 20;
    private Integer currentMembers = 1;

    @ElementCollection
    private List<Long> memberList;

    private String shareableLink;

    private String status; // ACTIVE, COMPLETED, CANCELLED

    private LocalDateTime watchStartTime;
    private LocalDateTime partyExpiresAt;

    private LocalDateTime createdAt;

    // ✅ No-args constructor
    public WatchParty() {}

    // ✅ All-args constructor
    public WatchParty(Long partyId, Long organizerId, Long movieId, String partyCode,
                      LocalDate watchDate, LocalTime watchTime, String description,
                      Integer maxMembers, Integer currentMembers, List<Long> memberList,
                      String shareableLink, String status, LocalDateTime watchStartTime,
                      LocalDateTime partyExpiresAt, LocalDateTime createdAt) {
        this.partyId = partyId;
        this.organizerId = organizerId;
        this.movieId = movieId;
        this.partyCode = partyCode;
        this.watchDate = watchDate;
        this.watchTime = watchTime;
        this.description = description;
        this.maxMembers = maxMembers;
        this.currentMembers = currentMembers;
        this.memberList = memberList;
        this.shareableLink = shareableLink;
        this.status = status;
        this.watchStartTime = watchStartTime;
        this.partyExpiresAt = partyExpiresAt;
        this.createdAt = createdAt;
    }

    // ✅ Getters and Setters
    public Long getPartyId() {
        return partyId;
    }

    public void setPartyId(Long partyId) {
        this.partyId = partyId;
    }

    public Long getOrganizerId() {
        return organizerId;
    }

    public void setOrganizerId(Long organizerId) {
        this.organizerId = organizerId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public String getPartyCode() {
        return partyCode;
    }

    public void setPartyCode(String partyCode) {
        this.partyCode = partyCode;
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

    public Integer getCurrentMembers() {
        return currentMembers;
    }

    public void setCurrentMembers(Integer currentMembers) {
        this.currentMembers = currentMembers;
    }

    public List<Long> getMemberList() {
        return memberList;
    }

    public void setMemberList(List<Long> memberList) {
        this.memberList = memberList;
    }

    public String getShareableLink() {
        return shareableLink;
    }

    public void setShareableLink(String shareableLink) {
        this.shareableLink = shareableLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getWatchStartTime() {
        return watchStartTime;
    }

    public void setWatchStartTime(LocalDateTime watchStartTime) {
        this.watchStartTime = watchStartTime;
    }

    public LocalDateTime getPartyExpiresAt() {
        return partyExpiresAt;
    }

    public void setPartyExpiresAt(LocalDateTime partyExpiresAt) {
        this.partyExpiresAt = partyExpiresAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}