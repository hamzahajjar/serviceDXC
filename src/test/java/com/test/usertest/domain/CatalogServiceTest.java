package com.test.usertest.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.usertest.web.rest.TestUtil;

public class CatalogServiceTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CatalogService.class);
        CatalogService catalogService1 = new CatalogService();
        catalogService1.setId(1L);
        CatalogService catalogService2 = new CatalogService();
        catalogService2.setId(catalogService1.getId());
        assertThat(catalogService1).isEqualTo(catalogService2);
        catalogService2.setId(2L);
        assertThat(catalogService1).isNotEqualTo(catalogService2);
        catalogService1.setId(null);
        assertThat(catalogService1).isNotEqualTo(catalogService2);
    }
}
