package com.test.usertest.repository;

import com.test.usertest.domain.ServiceOffered;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ServiceOffered entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceOfferedRepository extends JpaRepository<ServiceOffered, Long> {
}
