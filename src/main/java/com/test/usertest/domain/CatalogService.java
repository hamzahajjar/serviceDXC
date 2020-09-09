package com.test.usertest.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;

/**
 * A CatalogService.
 */
@Entity
@Table(name = "catalog_service")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CatalogService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "sla")
    private Integer sla;

    @ManyToOne
    @JoinColumn(name= "idUser")
    private User user;

    @ManyToOne
    @JoinColumn(name = "idServiceEntity")
    private ServiceEntity serviceEntity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSla() {
        return sla;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CatalogService sla(Integer sla) {
        this.sla = sla;
        return this;
    }

    public void setSla(Integer sla) {
        this.sla = sla;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public ServiceEntity getServiceEntity() {
        return serviceEntity;
    }

    public void setServiceEntity(ServiceEntity serviceEntity) {
        this.serviceEntity = serviceEntity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CatalogService)) {
            return false;
        }
        return id != null && id.equals(((CatalogService) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CatalogService{" +
            "id=" + getId() +
            ", sla=" + getSla() +
            ", user=" + getUser() +
            ", serviceEntity='" + ((getServiceEntity() != null )? getServiceEntity().toString() : "") + '\'' +
            "}";
    }
}
