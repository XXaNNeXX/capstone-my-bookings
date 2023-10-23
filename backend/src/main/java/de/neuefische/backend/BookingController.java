package de.neuefische.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    Booking postBooking(@RequestBody Booking booking) {
        return bookingService.addBooking(booking);
    }

    @GetMapping
    List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}
