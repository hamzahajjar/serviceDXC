package com.test.usertest.web.rest;

import com.test.usertest.domain.CatalogService;
import com.test.usertest.domain.ServiceEntity;
import com.test.usertest.domain.ServiceOffered;
import com.test.usertest.repository.ServiceOfferedRepository;
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
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.test.usertest.domain.ServiceOffered}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceOfferedResource {

    private final Logger log = LoggerFactory.getLogger(ServiceOfferedResource.class);

    private static final String ENTITY_NAME = "serviceOffered";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceOfferedRepository serviceOfferedRepository;

    public ServiceOfferedResource(ServiceOfferedRepository serviceOfferedRepository) {
        this.serviceOfferedRepository = serviceOfferedRepository;
    }

    /**
     * {@code POST  /service-offereds} : Create a new serviceOffered.
     *
     * @param serviceOffered the serviceOffered to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceOffered, or with status {@code 400 (Bad Request)} if the serviceOffered has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-offereds")
    public ResponseEntity<ServiceOffered> createServiceOffered(@RequestBody ServiceOffered serviceOffered) throws URISyntaxException {
        log.debug("REST request to save ServiceOffered : {}", serviceOffered);
        if (serviceOffered.getId() != null) {
            throw new BadRequestAlertException("A new serviceOffered cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceOffered result = serviceOfferedRepository.save(serviceOffered);
        return ResponseEntity.created(new URI("/api/service-offereds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-offereds} : Updates an existing serviceOffered.
     *
     * @param serviceOffered the serviceOffered to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceOffered,
     * or with status {@code 400 (Bad Request)} if the serviceOffered is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceOffered couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-offereds")
    public ResponseEntity<ServiceOffered> updateServiceOffered(@RequestBody ServiceOffered serviceOffered) throws URISyntaxException {
        log.debug("REST request to update ServiceOffered : {}", serviceOffered);
        if (serviceOffered.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceOffered result = serviceOfferedRepository.save(serviceOffered);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serviceOffered.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-offereds} : get all the serviceOffereds.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceOffereds in body.
     */
    @GetMapping("/service-offereds")
    public List<ServiceOffered> getAllServiceOffereds() {
        log.debug("REST request to get all ServiceOffereds");
        return serviceOfferedRepository.findAll();
    }

    /**
     * {@code GET  /service-offereds/:id} : get the "id" serviceOffered.
     *
     * @param id the id of the serviceOffered to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceOffered, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-offereds/{id}")
    public ResponseEntity<ServiceOffered> getServiceOffered(@PathVariable Long id) {
        log.debug("REST request to get ServiceOffered : {}", id);
        Optional<ServiceOffered> serviceOffered = serviceOfferedRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceOffered);
    }

    /**
     * {@code DELETE  /service-offereds/:id} : delete the "id" serviceOffered.
     *
     * @param id the id of the serviceOffered to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-offereds/{id}")
    public ResponseEntity<Void> deleteServiceOffered(@PathVariable Long id) {
        log.debug("REST request to delete ServiceOffered : {}", id);
        Optional<ServiceOffered> serviceOffered=serviceOfferedRepository.findById(id);
        for (CatalogService catalogService:serviceOffered.get().getCatalogServices()
        ) {
            catalogService.setServiceOffered(null);
        }
        serviceOfferedRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
