package com.test.usertest.web.rest;

import com.test.usertest.domain.ServiceEntity;
import com.test.usertest.domain.Society;
import com.test.usertest.domain.Team;
import com.test.usertest.domain.User;
import com.test.usertest.repository.SocietyRepository;
import com.test.usertest.security.AuthoritiesConstants;
import com.test.usertest.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.test.usertest.domain.Society}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SocietyResource {

    private final Logger log = LoggerFactory.getLogger(SocietyResource.class);

    private static final String ENTITY_NAME = "society";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SocietyRepository societyRepository;

    public SocietyResource(SocietyRepository societyRepository) {
        this.societyRepository = societyRepository;
    }

    /**
     * {@code POST  /societies} : Create a new society.
     *
     * @param society the society to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new society, or with status {@code 400 (Bad Request)} if the society has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/societies")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Society> createSociety(@RequestBody Society society) throws URISyntaxException {
        log.debug("REST request to save Society : {}", society);
        if (society.getId() != null) {
            throw new BadRequestAlertException("A new society cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Society result = societyRepository.save(society);
        return ResponseEntity.created(new URI("/api/societies/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /societies} : Updates an existing society.
     *
     * @param society the society to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated society,
     * or with status {@code 400 (Bad Request)} if the society is not valid,
     * or with status {@code 500 (Internal Server Error)} if the society couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/societies")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Society> updateSociety(@RequestBody Society society) throws URISyntaxException {
        log.debug("REST request to update Society : {}", society);
        if (society.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Society result = societyRepository.save(society);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, society.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /societies} : get all the societies.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of societies in body.
     */
    @GetMapping("/societies")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public List<Society> getAllSocieties() {
        log.debug("REST request to get all Societies");
        return societyRepository.findAll();
    }

    /**
     * {@code GET  /societies/:id} : get the "id" society.
     *
     * @param id the id of the society to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the society, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/societies/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Society> getSociety(@PathVariable Long id) {
        log.debug("REST request to get Society : {}", id);
        Optional<Society> society = societyRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(society);
    }
    @GetMapping("/societies/{id}/users")
    public ResponseEntity<Set<User>> getUsersSociety(@PathVariable Long id)
    {
        log.debug("REST request to get Users Team : {}", id);
        Optional<Society> society =societyRepository.findById(id);
        Optional<Set<User>> usersSociety= Optional.ofNullable(society.get().getUsers());
        return ResponseUtil.wrapOrNotFound(usersSociety);

    }

    /**
     * {@code DELETE  /societies/:id} : delete the "id" society.
     *
     * @param id the id of the society to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/societies/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteSociety(@PathVariable Long id) {
        log.debug("REST request to delete Society : {}", id);
        Optional<Society> society =societyRepository.findById(id);

        for (ServiceEntity serviceEntity:society.get().getServiceEntities()
        ) {
            serviceEntity.setSociety(null);
        }
        societyRepository.deleteById(id);

        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
