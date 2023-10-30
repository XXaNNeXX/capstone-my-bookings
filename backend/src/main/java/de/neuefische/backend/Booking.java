package de.neuefische.backend;

import java.time.LocalDate;

public record Booking(
        String id,
        String name,
        LocalDate arrival,
        LocalDate departure,
        Integer adults,
        Integer children
) {
}
