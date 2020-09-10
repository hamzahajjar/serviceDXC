package com.test.usertest.web.rest;

import com.test.usertest.UserTestApp;
import com.test.usertest.domain.ServiceOffered;
import com.test.usertest.repository.ServiceOfferedRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ServiceOfferedResource} REST controller.
 */
@SpringBootTest(classes = UserTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServiceOfferedResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ServiceOfferedRepository serviceOfferedRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceOfferedMockMvc;

    private ServiceOffered serviceOffered;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceOffered createEntity(EntityManager em) {
        ServiceOffered serviceOffered = new ServiceOffered()
            .name(DEFAULT_NAME);
        return serviceOffered;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceOffered createUpdatedEntity(EntityManager em) {
        ServiceOffered serviceOffered = new ServiceOffered()
            .name(UPDATED_NAME);
        return serviceOffered;
    }

    @BeforeEach
    public void initTest() {
        serviceOffered = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceOffered() throws Exception {
        int databaseSizeBeforeCreate = serviceOfferedRepository.findAll().size();
        // Create the ServiceOffered
        restServiceOfferedMockMvc.perform(post("/api/service-offereds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceOffered)))
            .andExpect(status().isCreated());

        // Validate the ServiceOffered in the database
        List<ServiceOffered> serviceOfferedList = serviceOfferedRepository.findAll();
        assertThat(serviceOfferedList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceOffered testServiceOffered = serviceOfferedList.get(serviceOfferedList.size() - 1);
        assertThat(testServiceOffered.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createServiceOfferedWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceOfferedRepository.findAll().size();

        // Create the ServiceOffered with an existing ID
        serviceOffered.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceOfferedMockMvc.perform(post("/api/service-offereds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceOffered)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceOffered in the database
        List<ServiceOffered> serviceOfferedList = serviceOfferedRepository.findAll();
        assertThat(serviceOfferedList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceOffereds() throws Exception {
        // Initialize the database
        serviceOfferedRepository.saveAndFlush(serviceOffered);

        // Get all the serviceOfferedList
        restServiceOfferedMockMvc.perform(get("/api/service-offereds?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceOffered.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getServiceOffered() throws Exception {
        // Initialize the database
        serviceOfferedRepository.saveAndFlush(serviceOffered);

        // Get the serviceOffered
        restServiceOfferedMockMvc.perform(get("/api/service-offereds/{id}", serviceOffered.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceOffered.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingServiceOffered() throws Exception {
        // Get the serviceOffered
        restServiceOfferedMockMvc.perform(get("/api/service-offereds/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceOffered() throws Exception {
        // Initialize the database
        serviceOfferedRepository.saveAndFlush(serviceOffered);

        int databaseSizeBeforeUpdate = serviceOfferedRepository.findAll().size();

        // Update the serviceOffered
        ServiceOffered updatedServiceOffered = serviceOfferedRepository.findById(serviceOffered.getId()).get();
        // Disconnect from session so that the updates on updatedServiceOffered are not directly saved in db
        em.detach(updatedServiceOffered);
        updatedServiceOffered
            .name(UPDATED_NAME);

        restServiceOfferedMockMvc.perform(put("/api/service-offereds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceOffered)))
            .andExpect(status().isOk());

        // Validate the ServiceOffered in the database
        List<ServiceOffered> serviceOfferedList = serviceOfferedRepository.findAll();
        assertThat(serviceOfferedList).hasSize(databaseSizeBeforeUpdate);
        ServiceOffered testServiceOffered = serviceOfferedList.get(serviceOfferedList.size() - 1);
        assertThat(testServiceOffered.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceOffered() throws Exception {
        int databaseSizeBeforeUpdate = serviceOfferedRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceOfferedMockMvc.perform(put("/api/service-offereds")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceOffered)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceOffered in the database
        List<ServiceOffered> serviceOfferedList = serviceOfferedRepository.findAll();
        assertThat(serviceOfferedList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceOffered() throws Exception {
        // Initialize the database
        serviceOfferedRepository.saveAndFlush(serviceOffered);

        int databaseSizeBeforeDelete = serviceOfferedRepository.findAll().size();

        // Delete the serviceOffered
        restServiceOfferedMockMvc.perform(delete("/api/service-offereds/{id}", serviceOffered.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceOffered> serviceOfferedList = serviceOfferedRepository.findAll();
        assertThat(serviceOfferedList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
