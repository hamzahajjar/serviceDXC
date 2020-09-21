package com.test.usertest.web.rest;

import com.test.usertest.UserTestApp;
import com.test.usertest.domain.Diagnostic;
import com.test.usertest.repository.DiagnosticRepository;

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
 * Integration tests for the {@link DiagnosticResource} REST controller.
 */
@SpringBootTest(classes = UserTestApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class DiagnosticResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DiagnosticRepository diagnosticRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDiagnosticMockMvc;

    private Diagnostic diagnostic;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diagnostic createEntity(EntityManager em) {
        Diagnostic diagnostic = new Diagnostic()
            .description(DEFAULT_DESCRIPTION);
        return diagnostic;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diagnostic createUpdatedEntity(EntityManager em) {
        Diagnostic diagnostic = new Diagnostic()
            .description(UPDATED_DESCRIPTION);
        return diagnostic;
    }

    @BeforeEach
    public void initTest() {
        diagnostic = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiagnostic() throws Exception {
        int databaseSizeBeforeCreate = diagnosticRepository.findAll().size();
        // Create the Diagnostic
        restDiagnosticMockMvc.perform(post("/api/diagnostics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diagnostic)))
            .andExpect(status().isCreated());

        // Validate the Diagnostic in the database
        List<Diagnostic> diagnosticList = diagnosticRepository.findAll();
        assertThat(diagnosticList).hasSize(databaseSizeBeforeCreate + 1);
        Diagnostic testDiagnostic = diagnosticList.get(diagnosticList.size() - 1);
        assertThat(testDiagnostic.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createDiagnosticWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diagnosticRepository.findAll().size();

        // Create the Diagnostic with an existing ID
        diagnostic.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiagnosticMockMvc.perform(post("/api/diagnostics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diagnostic)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnostic in the database
        List<Diagnostic> diagnosticList = diagnosticRepository.findAll();
        assertThat(diagnosticList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDiagnostics() throws Exception {
        // Initialize the database
        diagnosticRepository.saveAndFlush(diagnostic);

        // Get all the diagnosticList
        restDiagnosticMockMvc.perform(get("/api/diagnostics?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diagnostic.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getDiagnostic() throws Exception {
        // Initialize the database
        diagnosticRepository.saveAndFlush(diagnostic);

        // Get the diagnostic
        restDiagnosticMockMvc.perform(get("/api/diagnostics/{id}", diagnostic.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(diagnostic.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingDiagnostic() throws Exception {
        // Get the diagnostic
        restDiagnosticMockMvc.perform(get("/api/diagnostics/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiagnostic() throws Exception {
        // Initialize the database
        diagnosticRepository.saveAndFlush(diagnostic);

        int databaseSizeBeforeUpdate = diagnosticRepository.findAll().size();

        // Update the diagnostic
        Diagnostic updatedDiagnostic = diagnosticRepository.findById(diagnostic.getId()).get();
        // Disconnect from session so that the updates on updatedDiagnostic are not directly saved in db
        em.detach(updatedDiagnostic);
        updatedDiagnostic
            .description(UPDATED_DESCRIPTION);

        restDiagnosticMockMvc.perform(put("/api/diagnostics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiagnostic)))
            .andExpect(status().isOk());

        // Validate the Diagnostic in the database
        List<Diagnostic> diagnosticList = diagnosticRepository.findAll();
        assertThat(diagnosticList).hasSize(databaseSizeBeforeUpdate);
        Diagnostic testDiagnostic = diagnosticList.get(diagnosticList.size() - 1);
        assertThat(testDiagnostic.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingDiagnostic() throws Exception {
        int databaseSizeBeforeUpdate = diagnosticRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDiagnosticMockMvc.perform(put("/api/diagnostics")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(diagnostic)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnostic in the database
        List<Diagnostic> diagnosticList = diagnosticRepository.findAll();
        assertThat(diagnosticList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiagnostic() throws Exception {
        // Initialize the database
        diagnosticRepository.saveAndFlush(diagnostic);

        int databaseSizeBeforeDelete = diagnosticRepository.findAll().size();

        // Delete the diagnostic
        restDiagnosticMockMvc.perform(delete("/api/diagnostics/{id}", diagnostic.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Diagnostic> diagnosticList = diagnosticRepository.findAll();
        assertThat(diagnosticList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
