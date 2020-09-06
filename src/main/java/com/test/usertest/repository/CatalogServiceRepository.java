package com.test.usertest.repository;

import com.test.usertest.domain.CatalogService;

import com.test.usertest.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the CatalogService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CatalogServiceRepository extends JpaRepository<CatalogService, Long> {

    List<CatalogService> findByUser(User user);
}
