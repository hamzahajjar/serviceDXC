package com.test.usertest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.usertest.web.rest.TestUtil;

public class SocietyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Society.class);
        Society society1 = new Society();
        society1.setId(1L);
        Society society2 = new Society();
        society2.setId(society1.getId());
        assertThat(society1).isEqualTo(society2);
        society2.setId(2L);
        assertThat(society1).isNotEqualTo(society2);
        society1.setId(null);
        assertThat(society1).isNotEqualTo(society2);
    }
}
