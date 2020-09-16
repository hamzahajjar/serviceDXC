package com.test.usertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Set;

/**
 * A ServiceOffered.
 */
@Entity
@Table(name = "service_offered")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ServiceOffered implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "serviceOffered",fetch = FetchType.EAGER)
    private Set<CatalogService> catalogServices;




    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ServiceOffered name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<CatalogService> getCatalogServices() {
        return catalogServices;
    }

    public void setCatalogServices(Set<CatalogService> catalogServices) {
        this.catalogServices = catalogServices;
    }


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceOffered)) {
            return false;
        }
        return id != null && id.equals(((ServiceOffered) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceOffered{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
