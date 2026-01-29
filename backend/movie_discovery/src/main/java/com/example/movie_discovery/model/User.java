package com.example.movie_discovery.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "users",
       indexes = {
           @Index(name = "idx_email", columnList = "email"),
           @Index(name = "idx_username", columnList = "username")
       })
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true)
    private String username;

    private String passwordHash;
    private String name;
    private String profilePictureUrl;

    @ElementCollection
    private List<String> favoriteGenres;

    @ElementCollection
    private List<String> preferredLanguages;

    private String preferredRuntime;
    private String contentRatingPreference;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
