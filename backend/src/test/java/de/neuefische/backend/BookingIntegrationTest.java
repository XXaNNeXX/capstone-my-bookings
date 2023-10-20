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
                                "adults": "2",
                                "children": "0"
                            }
                            """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                                            {
                                                "name": "Test",
                                                "arrival": "01.01.2024",
                                                "departure": "05.01.2024",
                                                "adults": "2",
                                                "children": "0"
                                            }
                                            """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }
}
