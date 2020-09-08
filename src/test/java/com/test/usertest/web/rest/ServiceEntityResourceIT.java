package com.test.usertest.web.rest;

import com.test.usertest.UserTestApp;
import com.test.usertest.domain.ServiceEntity;
import com.test.usertest.repository.ServiceEntityRepository;

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
 * Integration tests for the {@link ServiceEntityResource} REST controller.
 */
@SpringBootTest(classes = UserTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ServiceEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ServiceEntityRepository serviceEntityRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceEntityMockMvc;

    private ServiceEntity serviceEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntity createEntity(EntityManager em) {
        ServiceEntity serviceEntity = new ServiceEntity()
            .name(DEFAULT_NAME);
        return serviceEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceEntity createUpdatedEntity(EntityManager em) {
        ServiceEntity serviceEntity = new ServiceEntity()
            .name(UPDATED_NAME);
        return serviceEntity;
    }

    @BeforeEach
    public void initTest() {
        serviceEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceEntity() throws Exception {
        int databaseSizeBeforeCreate = serviceEntityRepository.findAll().size();
        // Create the ServiceEntity
        restServiceEntityMockMvc.perform(post("/api/service-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntity)))
            .andExpect(status().isCreated());

        // Validate the ServiceEntity in the database
        List<ServiceEntity> serviceEntityList = serviceEntityRepository.findAll();
        assertThat(serviceEntityList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceEntity testServiceEntity = serviceEntityList.get(serviceEntityList.size() - 1);
        assertThat(testServiceEntity.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createServiceEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceEntityRepository.findAll().size();

        // Create the ServiceEntity with an existing ID
        serviceEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceEntityMockMvc.perform(post("/api/service-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntity)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntity in the database
        List<ServiceEntity> serviceEntityList = serviceEntityRepository.findAll();
        assertThat(serviceEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllServiceEntities() throws Exception {
        // Initialize the database
        serviceEntityRepository.saveAndFlush(serviceEntity);

        // Get all the serviceEntityList
        restServiceEntityMockMvc.perform(get("/api/service-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getServiceEntity() throws Exception {
        // Initialize the database
        serviceEntityRepository.saveAndFlush(serviceEntity);

        // Get the serviceEntity
        restServiceEntityMockMvc.perform(get("/api/service-entities/{id}", serviceEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingServiceEntity() throws Exception {
        // Get the serviceEntity
        restServiceEntityMockMvc.perform(get("/api/service-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceEntity() throws Exception {
        // Initialize the database
        serviceEntityRepository.saveAndFlush(serviceEntity);

        int databaseSizeBeforeUpdate = serviceEntityRepository.findAll().size();

        // Update the serviceEntity
        ServiceEntity updatedServiceEntity = serviceEntityRepository.findById(serviceEntity.getId()).get();
        // Disconnect from session so that the updates on updatedServiceEntity are not directly saved in db
        em.detach(updatedServiceEntity);
        updatedServiceEntity
            .name(UPDATED_NAME);

        restServiceEntityMockMvc.perform(put("/api/service-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedServiceEntity)))
            .andExpect(status().isOk());

        // Validate the ServiceEntity in the database
        List<ServiceEntity> serviceEntityList = serviceEntityRepository.findAll();
        assertThat(serviceEntityList).hasSize(databaseSizeBeforeUpdate);
        ServiceEntity testServiceEntity = serviceEntityList.get(serviceEntityList.size() - 1);
        assertThat(testServiceEntity.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceEntity() throws Exception {
        int databaseSizeBeforeUpdate = serviceEntityRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceEntityMockMvc.perform(put("/api/service-entities")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(serviceEntity)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceEntity in the database
        List<ServiceEntity> serviceEntityList = serviceEntityRepository.findAll();
        assertThat(serviceEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceEntity() throws Exception {
        // Initialize the database
        serviceEntityRepository.saveAndFlush(serviceEntity);

        int databaseSizeBeforeDelete = serviceEntityRepository.findAll().size();

        // Delete the serviceEntity
        restServiceEntityMockMvc.perform(delete("/api/service-entities/{id}", serviceEntity.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceEntity> serviceEntityList = serviceEntityRepository.findAll();
        assertThat(serviceEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
