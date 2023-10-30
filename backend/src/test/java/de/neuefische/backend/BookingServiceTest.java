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
    Booking newBooking1 = new Booking(null,"Me", arrival1, departure1, 2, 2);
    Booking newBooking2 = new Booking(null,"Guest #2", arrival2, departure2, 4, 0);
    Booking booking3 = new Booking("1", "Guest #3", arrival2, departure2, 4, 0);

    @Test
    void addBooking() {
        when(bookingRepository.save(newBooking1))
                .thenReturn(new Booking("1","Me", arrival1, departure1, 2, 2));

        Booking actual = bookingService.addBooking(newBooking1);

        verify(bookingRepository).save(newBooking1);
        Booking expected = new Booking("1","Me", arrival1, departure1, 2, 2);
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
    void changeBooking() {
        String id = "1";

        when(bookingRepository.save(booking3))
                .thenReturn(new Booking("1", "Guest #3", arrival2, departure2, 4, 0));

        Booking actual = bookingService.updateBooking(id, booking3);

        verify(bookingRepository).save(booking3);
        Booking expected = booking3;
        assertEquals(expected, actual);

    }

    @Test
    void changeBooking_wrongId() {
        Booking newBooking = new Booking("2", "Guest #3", arrival2, departure2, 4, 0);

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
