package com.test.usertest.web.rest;

import com.test.usertest.UserTestApp;
import com.test.usertest.domain.CatalogService;
import com.test.usertest.repository.CatalogServiceRepository;

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
 * Integration tests for the {@link CatalogServiceResource} REST controller.
 */
@SpringBootTest(classes = UserTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CatalogServiceResourceIT {

    private static final Integer DEFAULT_SLA = 1;
    private static final Integer UPDATED_SLA = 2;

    @Autowired
    private CatalogServiceRepository catalogServiceRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCatalogServiceMockMvc;

    private CatalogService catalogService;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CatalogService createEntity(EntityManager em) {
        CatalogService catalogService = new CatalogService()
            .sla(DEFAULT_SLA);
        return catalogService;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CatalogService createUpdatedEntity(EntityManager em) {
        CatalogService catalogService = new CatalogService()
            .sla(UPDATED_SLA);
        return catalogService;
    }

    @BeforeEach
    public void initTest() {
        catalogService = createEntity(em);
    }

    @Test
    @Transactional
    public void createCatalogService() throws Exception {
        int databaseSizeBeforeCreate = catalogServiceRepository.findAll().size();
        // Create the CatalogService
        restCatalogServiceMockMvc.perform(post("/api/catalog-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(catalogService)))
            .andExpect(status().isCreated());

        // Validate the CatalogService in the database
        List<CatalogService> catalogServiceList = catalogServiceRepository.findAll();
        assertThat(catalogServiceList).hasSize(databaseSizeBeforeCreate + 1);
        CatalogService testCatalogService = catalogServiceList.get(catalogServiceList.size() - 1);
        assertThat(testCatalogService.getSla()).isEqualTo(DEFAULT_SLA);
    }

    @Test
    @Transactional
    public void createCatalogServiceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = catalogServiceRepository.findAll().size();

        // Create the CatalogService with an existing ID
        catalogService.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCatalogServiceMockMvc.perform(post("/api/catalog-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(catalogService)))
            .andExpect(status().isBadRequest());

        // Validate the CatalogService in the database
        List<CatalogService> catalogServiceList = catalogServiceRepository.findAll();
        assertThat(catalogServiceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCatalogServices() throws Exception {
        // Initialize the database
        catalogServiceRepository.saveAndFlush(catalogService);

        // Get all the catalogServiceList
        restCatalogServiceMockMvc.perform(get("/api/catalog-services?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(catalogService.getId().intValue())))
            .andExpect(jsonPath("$.[*].sla").value(hasItem(DEFAULT_SLA)));
    }
    
    @Test
    @Transactional
    public void getCatalogService() throws Exception {
        // Initialize the database
        catalogServiceRepository.saveAndFlush(catalogService);

        // Get the catalogService
        restCatalogServiceMockMvc.perform(get("/api/catalog-services/{id}", catalogService.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(catalogService.getId().intValue()))
            .andExpect(jsonPath("$.sla").value(DEFAULT_SLA));
    }
    @Test
    @Transactional
    public void getNonExistingCatalogService() throws Exception {
        // Get the catalogService
        restCatalogServiceMockMvc.perform(get("/api/catalog-services/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCatalogService() throws Exception {
        // Initialize the database
        catalogServiceRepository.saveAndFlush(catalogService);

        int databaseSizeBeforeUpdate = catalogServiceRepository.findAll().size();

        // Update the catalogService
        CatalogService updatedCatalogService = catalogServiceRepository.findById(catalogService.getId()).get();
        // Disconnect from session so that the updates on updatedCatalogService are not directly saved in db
        em.detach(updatedCatalogService);
        updatedCatalogService
            .sla(UPDATED_SLA);

        restCatalogServiceMockMvc.perform(put("/api/catalog-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCatalogService)))
            .andExpect(status().isOk());

        // Validate the CatalogService in the database
        List<CatalogService> catalogServiceList = catalogServiceRepository.findAll();
        assertThat(catalogServiceList).hasSize(databaseSizeBeforeUpdate);
        CatalogService testCatalogService = catalogServiceList.get(catalogServiceList.size() - 1);
        assertThat(testCatalogService.getSla()).isEqualTo(UPDATED_SLA);
    }

    @Test
    @Transactional
    public void updateNonExistingCatalogService() throws Exception {
        int databaseSizeBeforeUpdate = catalogServiceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCatalogServiceMockMvc.perform(put("/api/catalog-services")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(catalogService)))
            .andExpect(status().isBadRequest());

        // Validate the CatalogService in the database
        List<CatalogService> catalogServiceList = catalogServiceRepository.findAll();
        assertThat(catalogServiceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCatalogService() throws Exception {
        // Initialize the database
        catalogServiceRepository.saveAndFlush(catalogService);

        int databaseSizeBeforeDelete = catalogServiceRepository.findAll().size();

        // Delete the catalogService
        restCatalogServiceMockMvc.perform(delete("/api/catalog-services/{id}", catalogService.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CatalogService> catalogServiceList = catalogServiceRepository.findAll();
        assertThat(catalogServiceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
