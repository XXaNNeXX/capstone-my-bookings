package de.neuefische.backend;

import java.time.LocalDate;

public record Booking(
        String id,
        String name,
        String phone,
        LocalDate arrival,
        LocalDate departure,
        int adults,
        int children,
        double money,
        String extras
) {
}
