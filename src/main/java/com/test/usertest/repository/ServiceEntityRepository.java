package com.test.usertest.repository;

import com.test.usertest.domain.ServiceEntity;

import com.test.usertest.domain.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ServiceEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceEntityRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByUser(User user);
}
