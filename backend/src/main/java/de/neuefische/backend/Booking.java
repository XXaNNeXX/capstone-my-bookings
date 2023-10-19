package de.neuefische.backend;

public record Booking(
        String id,
        String name,
        String arrival,
        String departure,
        String adults,
        String children
) {
}
