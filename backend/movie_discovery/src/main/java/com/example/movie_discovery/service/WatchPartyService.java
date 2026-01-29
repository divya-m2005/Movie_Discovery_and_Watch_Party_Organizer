// package com.example.movie_discovery.service;

// import com.example.movie_discovery.model.WatchParty;
// import com.example.movie_discovery.repository.WatchPartyRepository;
// import org.springframework.stereotype.Service;

// import java.time.LocalDateTime;
// import java.util.UUID;

// @Service
// public class WatchPartyService {

//     private final WatchPartyRepository repo;

//     public WatchPartyService(WatchPartyRepository repo) {
//         this.repo = repo;
//     }

//     public WatchParty createParty(Long userId, Object req) {
//         WatchParty p = new WatchParty();
//         p.setOrganizerId(userId);
//         p.setPartyCode("PARTY_" + UUID.randomUUID().toString().substring(0, 6));
//         p.setStatus("ACTIVE");
//         p.setCreatedAt(LocalDateTime.now());
//         return repo.save(p);
//     }

//     public WatchParty getParty(String code) {
//         return repo.findByPartyCode(code).orElseThrow();
//     }
// }
package com.example.movie_discovery.service;

import com.example.movie_discovery.dto.CreateWatchPartyRequest;
import com.example.movie_discovery.model.WatchParty;
import com.example.movie_discovery.repository.WatchPartyRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class WatchPartyService {

    private final WatchPartyRepository repo;

    public WatchPartyService(WatchPartyRepository repo) {
        this.repo = repo;
    }

    public WatchParty createParty(Long userId, CreateWatchPartyRequest req) {

        String partyCode;
        do {
            partyCode = UUID.randomUUID().toString()
                    .replace("-", "")
                    .substring(0, 6)
                    .toUpperCase();
        } while (repo.existsByPartyCode(partyCode));

        WatchParty party = new WatchParty();
        party.setOrganizerId(userId);
        party.setMovieId(req.getMovieId());
        party.setWatchDate(req.getWatchDate());
        party.setWatchTime(req.getWatchTime());
        party.setDescription(req.getDescription());
        party.setMaxMembers(req.getMaxMembers() != null ? req.getMaxMembers() : 20);

        party.setPartyCode(partyCode);
        party.setStatus("ACTIVE");
        party.setCurrentMembers(1);
        party.setMemberList(List.of(userId));
        party.setCreatedAt(LocalDateTime.now());

        party.setWatchStartTime(
                LocalDateTime.of(req.getWatchDate(), req.getWatchTime())
        );
        party.setPartyExpiresAt(party.getWatchStartTime().plusHours(4));

        party.setShareableLink("http://localhost:3000/party/" + partyCode);

        return repo.save(party);
    }

    public WatchParty getParty(String code) {
        return repo.findByPartyCode(code)
                .orElseThrow(() -> new RuntimeException("Watch Party not found"));
    }

    public List<WatchParty> getAllActiveParties() {
        return repo.findByStatus("ACTIVE");
    }

    public List<WatchParty> getPartiesByOrganizer(Long organizerId) {
        return repo.findByOrganizerIdOrderByCreatedAtDesc(organizerId);
    }

    public WatchParty completeParty(Long partyId) {
        WatchParty party = repo.findById(partyId)
                .orElseThrow(() -> new RuntimeException("Watch Party not found"));
        party.setStatus("COMPLETED");
        return repo.save(party);
    }

    public List<WatchParty> getCompletedParties(Long userId) {
        return repo.findByStatusOrderByCreatedAtDesc("COMPLETED");
    }

    public String deleteParty(Long partyId) {
        repo.deleteById(partyId);
        return "Party deleted successfully";
    }

    public WatchParty joinParty(Long partyId, Long userId) {
        WatchParty party = repo.findById(partyId)
                .orElseThrow(() -> new RuntimeException("Watch Party not found"));
        
        if (!party.getMemberList().contains(userId) && party.getCurrentMembers() < party.getMaxMembers()) {
            party.getMemberList().add(userId);
            party.setCurrentMembers(party.getCurrentMembers() + 1);
            return repo.save(party);
        }
        
        return party;
    }

    public WatchParty joinPartyByCode(String partyCode, Long userId) {
        WatchParty party = getParty(partyCode);
        
        if (!party.getMemberList().contains(userId) && party.getCurrentMembers() < party.getMaxMembers()) {
            party.getMemberList().add(userId);
            party.setCurrentMembers(party.getCurrentMembers() + 1);
            return repo.save(party);
        }
        
        return party;
    }
    public WatchParty rsvpParty(String partyCode, Long userId) {
    WatchParty party = getParty(partyCode); // reuse existing getParty method

    if (!party.getMemberList().contains(userId) && party.getCurrentMembers() < party.getMaxMembers()) {
        party.getMemberList().add(userId);
        party.setCurrentMembers(party.getCurrentMembers() + 1);
        return repo.save(party); // repo is accessible here
    }

    return party;
}
}
