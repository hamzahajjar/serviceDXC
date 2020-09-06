package com.test.usertest.repository;

import com.test.usertest.domain.CatalogService;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CatalogService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CatalogServiceRepository extends JpaRepository<CatalogService, Long> {
}
