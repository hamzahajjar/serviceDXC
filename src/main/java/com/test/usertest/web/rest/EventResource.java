package com.test.usertest.web.rest;

import com.test.usertest.domain.Event;
import com.test.usertest.repository.EventRepository;
import com.test.usertest.repository.UserRepository;
import com.test.usertest.security.SecurityUtils;
import com.test.usertest.service.MailService;
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
 * REST controller for managing {@link com.test.usertest.domain.Event}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EventResource {

    private final Logger log = LoggerFactory.getLogger(EventResource.class);

    private static final String ENTITY_NAME = "event";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EventRepository eventRepository;

    private final UserRepository userRepository;

    private final MailService mailService;

    public EventResource(EventRepository eventRepository,UserRepository userRepository,MailService mailService) {
        this.eventRepository = eventRepository;
        this.userRepository=userRepository;
        this.mailService=mailService;
    }

    /**
     * {@code POST  /events} : Create a new event.
     *
     * @param event the event to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new event, or with status {@code 400 (Bad Request)} if the event has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to save Event : {}", event);
        if (event.getId() != null) {
            throw new BadRequestAlertException("A new event cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SecurityUtils.getCurrentUserLogin()
            .flatMap(userRepository::findOneByLogin).ifPresent(user->event.setClaimer(user));
        event.setCreatedAt(new Date(System.currentTimeMillis()).toInstant());
        Event result = eventRepository.save(event);
        SecurityUtils.getCurrentUserLogin()
            .flatMap((userRepository::findOneByLogin)).ifPresent(user -> mailService.sendCreationEvent(user,event));
        return ResponseEntity.created(new URI("/api/events/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /events} : Updates an existing event.
     *
     * @param event the event to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated event,
     * or with status {@code 400 (Bad Request)} if the event is not valid,
     * or with status {@code 500 (Internal Server Error)} if the event couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/events")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) throws URISyntaxException {
        log.debug("REST request to update Event : {}", event);
        if (event.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Event result = eventRepository.save(event);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, event.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /events} : get all the events.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of events in body.
     */
    @GetMapping("/events")
    public List<Event> getAllEvents() {
        log.debug("REST request to get all Events");
        return eventRepository.findAll();
    }

    /**
     * {@code GET  /events/:id} : get the "id" event.
     *
     * @param id the id of the event to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the event, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEvent(@PathVariable Long id) {
        log.debug("REST request to get Event : {}", id);
        Optional<Event> event = eventRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(event);
    }

    /**
     * {@code DELETE  /events/:id} : delete the "id" event.
     *
     * @param id the id of the event to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/events/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        log.debug("REST request to delete Event : {}", id);
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
