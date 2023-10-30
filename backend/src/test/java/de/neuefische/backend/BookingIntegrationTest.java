package de.neuefische.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookingIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    BookingRepository bookingRepository;

    LocalDate arrival1 = LocalDate.parse("03.03.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate departure1 = LocalDate.parse("06.03.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate arrival2 = LocalDate.parse("04.04.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));
    LocalDate departure2 = LocalDate.parse("10.04.2024", DateTimeFormatter.ofPattern("dd.MM.yyyy"));

    @Test
    @DirtiesContext
    void addBooking_expectSuccessfulPost() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/booking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "name": "Test",
                                "arrival": "2024-01-01",
                                "departure": "2024-01-05",
                                "adults": 2,
                                "children": 0
                            }
                            """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                            {
                                                "name": "Test",
                                                "arrival": "2024-01-01",
                                                "departure": "2024-01-05",
                                                "adults": 2,
                                                "children": 0
                                            }
                                            """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void getAllBookings_expectRepositoryContent() throws Exception {
        bookingRepository.save(new Booking("1","Guest #1",arrival1,departure1,2, 0));
        bookingRepository.save(new Booking("2", "Guest #2", arrival2, departure2,4,0));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/booking"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                        [
                            {
                                "id": "1",
                                "name": "Guest #1",
                                "arrival": "2024-03-03",
                                "departure": "2024-03-06",
                                "adults": 2,
                                "children": 0
                            },
                            {
                                "id": "2",
                                "name": "Guest #2",
                                "arrival": "2024-04-04",
                                "departure": "2024-04-10",
                                "adults": 4,
                                "children": 0
                            }
                        ]
                        """
                ));
    }

    @Test
    @DirtiesContext
    void updateBooking_expectSuccessfulPut() throws Exception {
        bookingRepository.save(new Booking("1","Guest #1",arrival1,departure1,2, 0));

        mockMvc.perform(MockMvcRequestBuilders.put("/api/booking/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                    {
                                        "id": "1",
                                        "name": "Guest #1",
                                        "arrival": "2024-03-04",
                                        "departure": "2024-03-07",
                                        "adults": 2,
                                        "children": 2
                                    }
                                    """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                            {
                                                "id": "1",
                                                "name": "Guest #1",
                                                "arrival": "2024-03-04",
                                                "departure": "2024-03-07",
                                                "adults": 2,
                                                "children": 2
                                            }
                                            """));
    }

    @Test
    @DirtiesContext
    void deleteBooking_expectSuccessfulDelete() throws Exception {
        bookingRepository.save(new Booking("1","Guest #1",arrival1,departure1,2, 0));

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/booking/1"))
                .andExpect(status().isOk());
    }

}
