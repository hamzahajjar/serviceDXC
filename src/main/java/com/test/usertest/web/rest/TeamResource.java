package com.test.usertest.web.rest;

import com.test.usertest.config.Constants;
import com.test.usertest.domain.Team;
import com.test.usertest.domain.User;
import com.test.usertest.repository.TeamRepository;
import com.test.usertest.repository.UserRepository;
import com.test.usertest.security.AuthoritiesConstants;
import com.test.usertest.service.dto.UserDTO;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.test.usertest.domain.Team}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TeamResource {

    private final Logger log = LoggerFactory.getLogger(TeamResource.class);

    private static final String ENTITY_NAME = "team";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TeamRepository teamRepository;

    private final UserRepository userRepository;

    public TeamResource(TeamRepository teamRepository,UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /teams} : Create a new team.
     *
     * @param team the team to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new team, or with status {@code 400 (Bad Request)} if the team has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/teams")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Team> createTeam(@Valid @RequestBody Team team) throws URISyntaxException {
        log.debug("REST request to save Team : {}", team);
        if (team.getId() != null) {
            throw new BadRequestAlertException("A new team cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Team result = teamRepository.save(team);
        return ResponseEntity.created(new URI("/api/teams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }


    /**
     * {@code PUT  /teams} : Updates an existing team.
     *
     * @param team the team to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated team,
     * or with status {@code 400 (Bad Request)} if the team is not valid,
     * or with status {@code 500 (Internal Server Error)} if the team couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/teams")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Team> updateTeam(@Valid @RequestBody Team team) throws URISyntaxException {
        log.debug("REST request to update Team : {}", team);
        if (team.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Team result = teamRepository.save(team);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, team.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /teams} : get all the teams.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of teams in body.
     */
    @GetMapping("/teams")

    public List<Team> getAllTeams() {
        log.debug("REST request to get all Teams");
        return teamRepository.findAll();
    }

    /**
     * {@code GET  /teams/:id} : get the "id" team.
     *
     * @param id the id of the team to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the team, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/teams/{id}")
    public ResponseEntity<Team> getTeam(@PathVariable Long id) {
        log.debug("REST request to get Team : {}", id);
        Optional<Team> team = teamRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(team);
    }
    @GetMapping("/teams/{id}/users")
    public ResponseEntity<Set<User>> getUsersTeam(@PathVariable Long id)
    {
        log.debug("REST request to get Users Team : {}", id);
        Optional<Team> team =teamRepository.findById(id);
        Optional<Set<User>> usersTeam= Optional.ofNullable(team.get().getUsers());
        return ResponseUtil.wrapOrNotFound(usersTeam);

    }

    @GetMapping("/teams/{id}/leader")
    public ResponseEntity<Optional<User>> getTeamLeader(@PathVariable Long id){
        log.debug("REST request to get Team Leader : {}", id);
        Optional<Team> team=teamRepository.findById(id);
        Optional<User> leader=Optional.ofNullable(team.get().getLeader());
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(leader));
    }

    @PostMapping("/teams/{id}/leader")
    public ResponseEntity<Team> setTeamLeader(@PathVariable Long id,@RequestParam String leaderLogin)throws URISyntaxException{
        Team team=teamRepository.findById(id).get();
        Optional<User> leader =userRepository.findOneByLogin(leaderLogin);
        log.debug("REST request to set Team Leader : {}", team);
        if (team.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        log.debug("Leader=", leader);
        for (User user: team.getUsers()
             ) {
            if(user.getId() == leader.get().getId()){
                team.setLeader(leader.get());
                Team result =teamRepository.save(team);
                return ResponseEntity.ok()
                    .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, team.getId().toString()))
                    .body(result);
            }
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * {@code DELETE  /teams/:id} : delete the "id" team.
     *
     * @param id the id of the team to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/teams/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        log.debug("REST request to delete Team : {}", id);
        Optional<Team> team =teamRepository.findById(id);

        for (User user:team.get().getUsers()
             ) {
            user.setTeam(null);
        }
        teamRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
