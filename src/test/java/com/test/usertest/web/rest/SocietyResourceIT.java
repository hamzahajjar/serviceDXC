package com.test.usertest.web.rest;

import com.test.usertest.UserTestApp;
import com.test.usertest.domain.Society;
import com.test.usertest.repository.SocietyRepository;

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
 * Integration tests for the {@link SocietyResource} REST controller.
 */
@SpringBootTest(classes = UserTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SocietyResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private SocietyRepository societyRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSocietyMockMvc;

    private Society society;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Society createEntity(EntityManager em) {
        Society society = new Society()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return society;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Society createUpdatedEntity(EntityManager em) {
        Society society = new Society()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return society;
    }

    @BeforeEach
    public void initTest() {
        society = createEntity(em);
    }

    @Test
    @Transactional
    public void createSociety() throws Exception {
        int databaseSizeBeforeCreate = societyRepository.findAll().size();
        // Create the Society
        restSocietyMockMvc.perform(post("/api/societies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(society)))
            .andExpect(status().isCreated());

        // Validate the Society in the database
        List<Society> societyList = societyRepository.findAll();
        assertThat(societyList).hasSize(databaseSizeBeforeCreate + 1);
        Society testSociety = societyList.get(societyList.size() - 1);
        assertThat(testSociety.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSociety.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createSocietyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = societyRepository.findAll().size();

        // Create the Society with an existing ID
        society.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSocietyMockMvc.perform(post("/api/societies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(society)))
            .andExpect(status().isBadRequest());

        // Validate the Society in the database
        List<Society> societyList = societyRepository.findAll();
        assertThat(societyList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSocieties() throws Exception {
        // Initialize the database
        societyRepository.saveAndFlush(society);

        // Get all the societyList
        restSocietyMockMvc.perform(get("/api/societies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(society.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getSociety() throws Exception {
        // Initialize the database
        societyRepository.saveAndFlush(society);

        // Get the society
        restSocietyMockMvc.perform(get("/api/societies/{id}", society.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(society.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingSociety() throws Exception {
        // Get the society
        restSocietyMockMvc.perform(get("/api/societies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSociety() throws Exception {
        // Initialize the database
        societyRepository.saveAndFlush(society);

        int databaseSizeBeforeUpdate = societyRepository.findAll().size();

        // Update the society
        Society updatedSociety = societyRepository.findById(society.getId()).get();
        // Disconnect from session so that the updates on updatedSociety are not directly saved in db
        em.detach(updatedSociety);
        updatedSociety
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restSocietyMockMvc.perform(put("/api/societies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSociety)))
            .andExpect(status().isOk());

        // Validate the Society in the database
        List<Society> societyList = societyRepository.findAll();
        assertThat(societyList).hasSize(databaseSizeBeforeUpdate);
        Society testSociety = societyList.get(societyList.size() - 1);
        assertThat(testSociety.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSociety.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingSociety() throws Exception {
        int databaseSizeBeforeUpdate = societyRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSocietyMockMvc.perform(put("/api/societies")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(society)))
            .andExpect(status().isBadRequest());

        // Validate the Society in the database
        List<Society> societyList = societyRepository.findAll();
        assertThat(societyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSociety() throws Exception {
        // Initialize the database
        societyRepository.saveAndFlush(society);

        int databaseSizeBeforeDelete = societyRepository.findAll().size();

        // Delete the society
        restSocietyMockMvc.perform(delete("/api/societies/{id}", society.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Society> societyList = societyRepository.findAll();
        assertThat(societyList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
