package de.neuefische.backend;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    BookingRepository bookingRepository = mock(BookingRepository.class);
    BookingService bookingService = new BookingService(bookingRepository);
    Booking newBooking1 = new Booking(null,"Me", "01.01.2024", "05.01.2024", 2, 2);
    Booking newBooking2 = new Booking(null,"Guest #2", "06.01.2024", "10.01.2024", 4, 0);

    @Test
    void addBooking() {
        when(bookingRepository.save(newBooking1))
                .thenReturn(new Booking("1","Me", "01.01.2024", "05.01.2024", 2, 2));

        Booking actual = bookingService.addBooking(newBooking1);

        verify(bookingRepository).save(newBooking1);
        Booking expected = new Booking("1","Me", "01.01.2024", "05.01.2024", 2, 2);
        assertEquals(expected, actual);
    }

    @Test
    void getAllBookings_returnList() {
        when(bookingRepository.findAll())
                .thenReturn(List.of(newBooking1, newBooking2));

        List<Booking> actual = bookingService.getAllBookings();

        verify(bookingRepository).findAll();
        List<Booking> expected = List.of(newBooking1, newBooking2);

        assertEquals(expected, actual);
    }
}
