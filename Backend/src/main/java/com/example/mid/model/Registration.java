package com.example.mid.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "registration")

public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private int id;

    @Column(name = "email",nullable = false)
    private String email;

    @Column(name = "code")
    private String code;

    @Column(name = "attended")
    private Boolean attended;

    private int authorization;

    @ManyToOne(
            cascade = CascadeType.MERGE,
            fetch = FetchType.LAZY
    )
    private Event event;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<AnswerStr> answerStr;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<AnswerInt> answerInt;

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<AnswerStr> getAnswerStr() {
        return answerStr;
    }

    public void setAnswerStr(List<AnswerStr> answerStr) {
        this.answerStr = answerStr;
    }

    public List<AnswerInt> getAnswerInt() {
        return answerInt;
    }

    public void setAnswerInt(List<AnswerInt> answerInt) {
        this.answerInt = answerInt;
    }

    public Boolean getAttended() {
        return attended;
    }

    public void setAttended(Boolean attended) {
        this.attended = attended;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAuthorization() { return authorization; }

    public void setAuthorization(int authorization) { this.authorization = authorization; }
}
