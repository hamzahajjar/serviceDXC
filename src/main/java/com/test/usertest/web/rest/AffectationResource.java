package com.test.usertest.web.rest;

import com.test.usertest.domain.Affectation;
import com.test.usertest.domain.Event;
import com.test.usertest.domain.enumeration.EventStatus;
import com.test.usertest.repository.AffectationRepository;
import com.test.usertest.repository.EventRepository;
import com.test.usertest.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.test.usertest.domain.Affectation}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AffectationResource {

    private final Logger log = LoggerFactory.getLogger(AffectationResource.class);

    private static final String ENTITY_NAME = "affectation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AffectationRepository affectationRepository;
    private final EventRepository eventRepository;

    public AffectationResource(AffectationRepository affectationRepository,EventRepository eventRepository) {
        this.affectationRepository = affectationRepository;
        this.eventRepository=eventRepository;
    }

    /**
     * {@code POST  /affectations} : Create a new affectation.
     *
     * @param affectation the affectation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectation, or with status {@code 400 (Bad Request)} if the affectation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectations")
    public ResponseEntity<Affectation> createAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to save Affectation : {}", affectation);
        if (affectation.getId() != null) {
            throw new BadRequestAlertException("A new affectation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Affectation result = affectationRepository.save(affectation);
        return ResponseEntity.created(new URI("/api/affectations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /affectations} : Updates an existing affectation.
     *
     * @param affectation the affectation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectation,
     * or with status {@code 400 (Bad Request)} if the affectation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the affectation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/affectations")
    public ResponseEntity<Affectation> updateAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to update Affectation : {}", affectation);
        if (affectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Affectation result = affectationRepository.save(affectation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, affectation.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /affectations} : get all the affectations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectations in body.
     */
    @GetMapping("/affectations")
    public List<Affectation> getAllAffectations() {
        log.debug("REST request to get all Affectations");
        return affectationRepository.findAll();
    }

    /**
     * {@code GET  /affectations/:id} : get the "id" affectation.
     *
     * @param id the id of the affectation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectations/{id}")
    public ResponseEntity<Affectation> getAffectation(@PathVariable Long id) {
        log.debug("REST request to get Affectation : {}", id);
        Optional<Affectation> affectation = affectationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(affectation);
    }

    @PostMapping("/affectations/{id}/validate")
    public  ResponseEntity<Affectation> validateAffectation(@PathVariable Long id){
        log.debug("REST request to validate Affectation : {}", id);
        Optional<Affectation> affectation=affectationRepository.findById(id);
        Event event=affectation.get().getEvent();
        if(event.getStartDate() == null){
            event.setStartDate(new Date(System.currentTimeMillis()).toInstant());
        }
        event.setStatus(EventStatus.InProgress);
        eventRepository.save(event);
        affectation.get().setStartDate(new Date(System.currentTimeMillis()).toInstant());
        affectationRepository.save(affectation.get());
        return ResponseUtil.wrapOrNotFound(affectation);

    }

    /**
     * {@code DELETE  /affectations/:id} : delete the "id" affectation.
     *
     * @param id the id of the affectation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectations/{id}")
    public ResponseEntity<Void> deleteAffectation(@PathVariable Long id) {
        log.debug("REST request to delete Affectation : {}", id);
        affectationRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
