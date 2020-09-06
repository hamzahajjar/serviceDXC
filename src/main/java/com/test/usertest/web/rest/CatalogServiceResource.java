package com.test.usertest.web.rest;

import com.test.usertest.domain.CatalogService;
import com.test.usertest.domain.User;
import com.test.usertest.repository.CatalogServiceRepository;
import com.test.usertest.repository.UserRepository;
import com.test.usertest.security.AuthoritiesConstants;
import com.test.usertest.security.SecurityUtils;
import com.test.usertest.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import liquibase.pro.packaged.U;
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

/**
 * REST controller for managing {@link com.test.usertest.domain.CatalogService}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CatalogServiceResource {

    private final Logger log = LoggerFactory.getLogger(CatalogServiceResource.class);

    private static final String ENTITY_NAME = "catalogService";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CatalogServiceRepository catalogServiceRepository;
    private final UserRepository userRepository;

    public CatalogServiceResource(CatalogServiceRepository catalogServiceRepository, UserRepository userRepository) {
        this.catalogServiceRepository = catalogServiceRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /catalog-services} : Create a new catalogService.
     *
     * @param catalogService the catalogService to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new catalogService, or with status {@code 400 (Bad Request)} if the catalogService has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/catalog-services")
    public ResponseEntity<CatalogService> createCatalogService(@RequestBody CatalogService catalogService) throws URISyntaxException {
        log.debug("REST request to save CatalogService : {}", catalogService);
        if (catalogService.getId() != null) {
            throw new BadRequestAlertException("A new catalogService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SecurityUtils.getCurrentUserLogin().
            flatMap(userRepository::findOneByLogin).ifPresent(user -> catalogService.setUser(user));
        CatalogService result = catalogServiceRepository.save(catalogService);
        return ResponseEntity.created(new URI("/api/catalog-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /catalog-services} : Updates an existing catalogService.
     *
     * @param catalogService the catalogService to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogService,
     * or with status {@code 400 (Bad Request)} if the catalogService is not valid,
     * or with status {@code 500 (Internal Server Error)} if the catalogService couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/catalog-services")
    public ResponseEntity<CatalogService> updateCatalogService(@RequestBody CatalogService catalogService) throws URISyntaxException {
        log.debug("REST request to update CatalogService : {}", catalogService);
        if (catalogService.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CatalogService result = catalogServiceRepository.save(catalogService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, catalogService.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /catalog-services} : get all the catalogServices.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of catalogServices in body.
     */
    @GetMapping("/catalog-services")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public List<CatalogService> getAllCatalogServices() {
        log.debug("REST request to get all CatalogServices");
        if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) {
            return catalogServiceRepository.findAll();
        } else {
            return catalogServiceRepository.findByUser(SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin).get());
        }

    }


    /**
     * {@code GET  /catalog-services/:id} : get the "id" catalogService.
     *
     * @param id the id of the catalogService to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the catalogService, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/catalog-services/{id}")
    public ResponseEntity<CatalogService> getCatalogService(@PathVariable Long id) {
        log.debug("REST request to get CatalogService : {}", id);
        Optional<CatalogService> catalogService = catalogServiceRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(catalogService);
    }

    /**
     * {@code DELETE  /catalog-services/:id} : delete the "id" catalogService.
     *
     * @param id the id of the catalogService to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/catalog-services/{id}")
    public ResponseEntity<Void> deleteCatalogService(@PathVariable Long id) {
        log.debug("REST request to delete CatalogService : {}", id);
        catalogServiceRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
