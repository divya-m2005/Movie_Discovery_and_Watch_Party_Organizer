package com.example.movie_discovery.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String username;
    private String password;
    private String name;
}