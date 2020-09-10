package com.test.usertest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.usertest.web.rest.TestUtil;

public class ServiceOfferedTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceOffered.class);
        ServiceOffered serviceOffered1 = new ServiceOffered();
        serviceOffered1.setId(1L);
        ServiceOffered serviceOffered2 = new ServiceOffered();
        serviceOffered2.setId(serviceOffered1.getId());
        assertThat(serviceOffered1).isEqualTo(serviceOffered2);
        serviceOffered2.setId(2L);
        assertThat(serviceOffered1).isNotEqualTo(serviceOffered2);
        serviceOffered1.setId(null);
        assertThat(serviceOffered1).isNotEqualTo(serviceOffered2);
    }
}
