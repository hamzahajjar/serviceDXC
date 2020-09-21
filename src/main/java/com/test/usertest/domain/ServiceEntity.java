package com.test.usertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Set;

/**
 * A ServiceEntity.
 */
@Entity
@Table(name = "service_entity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ServiceEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name= "idUser")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "idSociety")
    private  Society society;

    @JsonIgnore
    @OneToMany(mappedBy = "serviceEntity",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Set<User> users;


    @ManyToMany(fetch = FetchType.EAGER)
    private Set<ServiceOffered> serviceOffereds;





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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Society getSociety() {
        return society;
    }

    public void setSociety(Society society) {
        this.society = society;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<ServiceOffered> getServiceOffereds() {
        return serviceOffereds;
    }

    public void setServiceOffereds(Set<ServiceOffered> serviceOffereds) {
        this.serviceOffereds = serviceOffereds;
    }

    public ServiceEntity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ServiceEntity)) {
            return false;
        }
        return id != null && id.equals(((ServiceEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ServiceEntity{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", user=" + getUser() +
            ",servicesOffered="+getServiceOffereds()+
            "}";
    }
}
