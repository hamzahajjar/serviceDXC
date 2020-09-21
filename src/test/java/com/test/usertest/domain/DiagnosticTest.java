package com.test.usertest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.usertest.web.rest.TestUtil;

public class DiagnosticTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diagnostic.class);
        Diagnostic diagnostic1 = new Diagnostic();
        diagnostic1.setId(1L);
        Diagnostic diagnostic2 = new Diagnostic();
        diagnostic2.setId(diagnostic1.getId());
        assertThat(diagnostic1).isEqualTo(diagnostic2);
        diagnostic2.setId(2L);
        assertThat(diagnostic1).isNotEqualTo(diagnostic2);
        diagnostic1.setId(null);
        assertThat(diagnostic1).isNotEqualTo(diagnostic2);
    }
}
