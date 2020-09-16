package com.test.usertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Set;

/**
 * A Society.
 */
@Entity
@Table(name = "society")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Society implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "society",fetch = FetchType.EAGER)
    private Set<User> users;


    @OneToMany(mappedBy = "society",fetch = FetchType.EAGER)
    private Set<ServiceEntity> serviceEntities;

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

    public Society name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Society description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here


    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<ServiceEntity> getServiceEntities() {
        return serviceEntities;
    }

    public void setServiceEntities(Set<ServiceEntity> serviceEntities) {
        this.serviceEntities = serviceEntities;
    }

    public void addServiceEntity(ServiceEntity serviceEntity){
        this.serviceEntities.add(serviceEntity);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Society)) {
            return false;
        }
        return id != null && id.equals(((Society) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Society{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ",serviceEntities='"+getServiceEntities()+"'"+
            "}";
    }
}
