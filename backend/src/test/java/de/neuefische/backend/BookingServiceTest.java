package de.neuefische.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    BookingRepository bookingRepository = mock(BookingRepository.class);
    BookingService bookingService = new BookingService(bookingRepository);
    Booking newBooking = new Booking(null,"Me", "01.01.2024", "05.01.2024", "2", "2");

    @Test
    void addBooking() {
        when(bookingRepository.save(newBooking))
                .thenReturn(new Booking("1","Me", "01.01.2024", "05.01.2024", "2", "2"));

        Booking actual = bookingService.addBooking(newBooking);

        verify(bookingRepository).save(newBooking);
        Booking expected = new Booking("1","Me", "01.01.2024", "05.01.2024", "2", "2");
        assertEquals(expected, actual);
    }
}
