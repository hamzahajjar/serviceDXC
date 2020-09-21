package com.test.usertest.repository;

import com.test.usertest.domain.Affectation;

import com.test.usertest.domain.Event;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

/**
 * Spring Data  repository for the Affectation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AffectationRepository extends JpaRepository<Affectation, Long> {
    Optional<Set<Affectation>> findAffectationsByEvent(Event event);
}
