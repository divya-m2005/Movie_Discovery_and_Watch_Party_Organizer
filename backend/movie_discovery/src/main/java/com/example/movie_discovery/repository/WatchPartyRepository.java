package com.example.movie_discovery.repository;

import com.example.movie_discovery.model.WatchParty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WatchPartyRepository extends JpaRepository<WatchParty, Long> {
    Optional<WatchParty> findByPartyCode(String partyCode);
    boolean existsByPartyCode(String partyCode);
    List<WatchParty> findByStatus(String status);
    List<WatchParty> findByOrganizerIdOrderByCreatedAtDesc(Long organizerId);
    List<WatchParty> findByStatusOrderByCreatedAtDesc(String status);
}
