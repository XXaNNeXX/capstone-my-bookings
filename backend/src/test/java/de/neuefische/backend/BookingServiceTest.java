package de.neuefische.backend;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookingServiceTest {

    BookingRepository bookingRepository = mock(BookingRepository.class);
    BookingService bookingService = new BookingService(bookingRepository);
    LocalDate arrival1 = LocalDate.parse("01.01.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate departure1 = LocalDate.parse("05.01.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate arrival2 = LocalDate.parse("06.01.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate departure2 = LocalDate.parse("10.01.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    Booking newBooking1 = new Booking(null,"Me", "123", arrival1, departure1, 2, 2, 100.99, "extra info");
    Booking newBooking2 = new Booking(null,"Guest #2", "456", arrival2, departure2, 4, 0, 101.88, "extra info");
    Booking booking3 = new Booking("3", "Guest #3", "789", arrival2, departure2, 4, 0, 102.77, "extra info");

    @Test
    void addBooking() {
        when(bookingRepository.save(newBooking1))
                .thenReturn(new Booking("1","Me", "123", arrival1, departure1, 2, 2, 100.99, "extra info"));

        Booking actual = bookingService.addBooking(newBooking1);

        verify(bookingRepository).save(newBooking1);
        Booking expected = new Booking("1","Me", "123", arrival1, departure1, 2, 2, 100.99, "extra info");
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

    @Test
    void changeBooking_correctId() {
        when(bookingRepository.save(booking3))
                .thenReturn(new Booking("3", "Guest #3", "789", arrival2, departure2, 4, 0, 102.77, "extra info"));

        Booking actual = bookingService.updateBooking("3", booking3);

        verify(bookingRepository).save(booking3);
        Booking expected = booking3;
        assertEquals(expected, actual);

    }

    @Test
    void changeBooking_wrongId() {
        Booking newBooking = new Booking("3", "Guest #3", "789", arrival2, departure2, 4, 0, 102.77, "extra info");

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            bookingService.updateBooking("1", newBooking);
        });

        assertEquals("Wrong Booking ID!", exception.getMessage());
        verify(bookingRepository, never()).save(any());
    }

    @Test
    void deleteBooking() {
        bookingService.removeBooking("1");

        verify(bookingRepository).deleteById("1");
    }
}
