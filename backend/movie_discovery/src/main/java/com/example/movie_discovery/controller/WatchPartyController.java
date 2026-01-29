package com.example.movie_discovery.controller;

import com.example.movie_discovery.dto.CreateWatchPartyRequest;
import com.example.movie_discovery.model.WatchParty;
import com.example.movie_discovery.service.WatchPartyService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/watch-party")
@CrossOrigin
public class WatchPartyController {

    private final WatchPartyService service;

    public WatchPartyController(WatchPartyService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public WatchParty create(@RequestBody CreateWatchPartyRequest req) {
        return service.createParty(1L, req);
    }

    @GetMapping("/all")
    public List<WatchParty> getAllParties() {
        return service.getAllActiveParties();
    }

    @GetMapping("/my-parties")
    public List<WatchParty> getMyParties() {
        return service.getPartiesByOrganizer(1L);
    }

    @GetMapping("/{partyCode}")
    public WatchParty get(@PathVariable String partyCode) {
        return service.getParty(partyCode);
    }

    @PostMapping("/{partyId}/join")
    public WatchParty joinParty(@PathVariable Long partyId) {
        return service.joinParty(partyId, 1L);
    }

    @PostMapping("/join-by-code/{partyCode}")
    public WatchParty joinByCode(@PathVariable String partyCode) {
        return service.joinPartyByCode(partyCode, 1L);
    }

    @PostMapping("/{partyId}/complete")
    public WatchParty completeParty(@PathVariable Long partyId) {
        return service.completeParty(partyId);
    }

    @DeleteMapping("/{partyId}")
    @CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.DELETE})
    public String deleteParty(@PathVariable Long partyId) {
        return service.deleteParty(partyId);
    }

    @GetMapping("/completed")
    public List<WatchParty> getCompletedParties() {
        return service.getCompletedParties(1L);
    }
}
