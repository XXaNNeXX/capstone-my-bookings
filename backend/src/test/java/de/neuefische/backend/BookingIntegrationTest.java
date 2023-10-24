package de.neuefische.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BookingIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    BookingRepository bookingRepository;

    @Test
    @DirtiesContext
    void addBooking_expectSuccessfulPost() throws Exception {

        mockMvc.perform(MockMvcRequestBuilders.post("/api/booking")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "name": "Test",
                                "arrival": "01.01.2024",
                                "departure": "05.01.2024",
                                "adults": 2,
                                "children": 0
                            }
                            """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                            {
                                                "name": "Test",
                                                "arrival": "01.01.2024",
                                                "departure": "05.01.2024",
                                                "adults": 2,
                                                "children": 0
                                            }
                                            """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void getAllBookings_expectRepositoryContent() throws Exception {
        bookingRepository.save(new Booking("1","Guest #1","03.03.2024","06.03.2024",2, 0));
        bookingRepository.save(new Booking("2", "Guest #2", "04.04.2024", "10.04.2024",4,0));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/booking"))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                        [
                            {
                                "id": "1",
                                "name": "Guest #1",
                                "arrival": "03.03.2024",
                                "departure": "06.03.2024",
                                "adults": 2,
                                "children": 0
                            },
                            {
                                "id": "2",
                                "name": "Guest #2",
                                "arrival": "04.04.2024",
                                "departure": "10.04.2024",
                                "adults": 4,
                                "children": 0
                            }
                        ]
                        """
                ));
    }
}
