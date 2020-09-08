package com.test.usertest.web.rest;

import com.test.usertest.domain.CatalogService;
import com.test.usertest.domain.ServiceEntity;
import com.test.usertest.repository.ServiceEntityRepository;
import com.test.usertest.repository.UserRepository;
import com.test.usertest.security.AuthoritiesConstants;
import com.test.usertest.security.SecurityUtils;
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

/**
 * REST controller for managing {@link com.test.usertest.domain.ServiceEntity}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ServiceEntityResource {

    private final Logger log = LoggerFactory.getLogger(ServiceEntityResource.class);

    private static final String ENTITY_NAME = "serviceEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceEntityRepository serviceEntityRepository;
    private final UserRepository userRepository;


    public ServiceEntityResource(ServiceEntityRepository serviceEntityRepository,UserRepository userRepository
    ) {
        this.serviceEntityRepository = serviceEntityRepository;
        this.userRepository=userRepository;
    }

    /**
     * {@code POST  /service-entities} : Create a new serviceEntity.
     *
     * @param serviceEntity the serviceEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceEntity, or with status {@code 400 (Bad Request)} if the serviceEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-entities")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public ResponseEntity<ServiceEntity> createServiceEntity(@RequestBody ServiceEntity serviceEntity) throws URISyntaxException {
        log.debug("REST request to save ServiceEntity : {}", serviceEntity);
        if (serviceEntity.getId() != null) {
            throw new BadRequestAlertException("A new serviceEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SecurityUtils.getCurrentUserLogin().
            flatMap(userRepository::findOneByLogin).ifPresent(user-> serviceEntity.setUser(user));
        ServiceEntity result = serviceEntityRepository.save(serviceEntity);
        return ResponseEntity.created(new URI("/api/service-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-entities} : Updates an existing serviceEntity.
     *
     * @param serviceEntity the serviceEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceEntity,
     * or with status {@code 400 (Bad Request)} if the serviceEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-entities")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public ResponseEntity<ServiceEntity> updateServiceEntity(@RequestBody ServiceEntity serviceEntity) throws URISyntaxException {
        log.debug("REST request to update ServiceEntity : {}", serviceEntity);
        if (serviceEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        

        log.debug("user="+serviceEntity.getUser());
        //serviceEntity.setUser(serviceEntity.getUser());
        ServiceEntity result = serviceEntityRepository.save(serviceEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serviceEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /service-entities} : get all the serviceEntities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceEntities in body.
     */
    @GetMapping("/service-entities")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public List<ServiceEntity> getAllServiceEntities() {
        log.debug("REST request to get all ServiceEntities");
        if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) {
            return serviceEntityRepository.findAll();
        } else {
            return serviceEntityRepository.findByUser(SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin).get());
        }

    }

    /**
     * {@code GET  /service-entities/:id} : get the "id" serviceEntity.
     *
     * @param id the id of the serviceEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-entities/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\") or hasAuthority(\"" + AuthoritiesConstants.MANAGER + "\")")
    public ResponseEntity<ServiceEntity> getServiceEntity(@PathVariable Long id) {
        log.debug("REST request to get ServiceEntity : {}", id);
        Optional<ServiceEntity> serviceEntity = serviceEntityRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(serviceEntity);
    }

    /**
     * {@code DELETE  /service-entities/:id} : delete the "id" serviceEntity.
     *
     * @param id the id of the serviceEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-entities/{id}")
    public ResponseEntity<Void> deleteServiceEntity(@PathVariable Long id) {
        log.debug("REST request to delete ServiceEntity : {}", id);
        serviceEntityRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
