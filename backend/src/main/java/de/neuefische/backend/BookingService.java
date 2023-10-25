package de.neuefische.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public Booking addBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateBooking(String id, Booking booking) {
        if(!id.equals(booking.id())) {
            throw new IllegalArgumentException("Wrong Booking ID!");
        }
        return bookingRepository.save(booking);
    }
}
