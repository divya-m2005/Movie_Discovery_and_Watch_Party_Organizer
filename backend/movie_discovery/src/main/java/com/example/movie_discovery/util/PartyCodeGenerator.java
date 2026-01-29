package com.example.movie_discovery.util;

import java.util.UUID;

public class PartyCodeGenerator {

    public static String generate() {
        return "PARTY_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
