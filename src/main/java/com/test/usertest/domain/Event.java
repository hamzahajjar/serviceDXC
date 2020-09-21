package com.test.usertest.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.test.usertest.domain.enumeration.EventStatus;
import com.test.usertest.domain.enumeration.EventType;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

/**
 * A Event.
 */
@Entity
@Table(name = "event")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;


    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;


    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private EventType type;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private EventStatus status;

    @ManyToOne
    @JoinColumn(name = "idClaimer")
    private User claimer;

    @ManyToOne
    @JoinColumn(name="id_service_offered")
    private ServiceOffered serviceOffered;

    @JsonIgnore
    @OneToMany(mappedBy = "event",fetch = FetchType.EAGER)
    private Set<Affectation> affectations;

    @JsonIgnore
    @OneToMany(mappedBy = "event",fetch = FetchType.EAGER)
    private Set<Diagnostic> diagnostics;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "start_date")
    private Instant startDate;

    @Column(name = "end_date")
    private Instant endDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Event title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Event description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EventType getType() {
        return type;
    }

    public void setType(EventType type) {
        this.type = type;
    }

    public EventStatus getStatus() {
        return status;
    }

    public void setStatus(EventStatus status) {
        this.status = status;
    }

    public User getClaimer() {
        return claimer;
    }

    public void setClaimer(User claimer) {
        this.claimer = claimer;
    }

    public ServiceOffered getServiceOffered() {
        return serviceOffered;
    }

    public void setServiceOffered(ServiceOffered serviceOffered) {
        this.serviceOffered = serviceOffered;
    }

    public Set<Affectation> getAffectations() {
        return affectations;
    }

    public void setAffectations(Set<Affectation> affectations) {
        this.affectations = affectations;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Event createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Event startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Event endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Set<Diagnostic> getDiagnostics() {
        return diagnostics;
    }

    public void setDiagnostics(Set<Diagnostic> diagnostics) {
        this.diagnostics = diagnostics;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Event)) {
            return false;
        }
        return id != null && id.equals(((Event) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Event{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", type='" + getType() + "'" +
            ",status='"+getStatus()+"'"+
            ", claimer='" + getClaimer() + "'" +
            ",serviceOffered="+getServiceOffered()+
            ", createdAt='" + getCreatedAt() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
