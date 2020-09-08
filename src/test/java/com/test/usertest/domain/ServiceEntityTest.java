package com.test.usertest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.usertest.web.rest.TestUtil;

public class ServiceEntityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceEntity.class);
        ServiceEntity serviceEntity1 = new ServiceEntity();
        serviceEntity1.setId(1L);
        ServiceEntity serviceEntity2 = new ServiceEntity();
        serviceEntity2.setId(serviceEntity1.getId());
        assertThat(serviceEntity1).isEqualTo(serviceEntity2);
        serviceEntity2.setId(2L);
        assertThat(serviceEntity1).isNotEqualTo(serviceEntity2);
        serviceEntity1.setId(null);
        assertThat(serviceEntity1).isNotEqualTo(serviceEntity2);
    }
}
