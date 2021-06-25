package com.example.mid.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "form")

public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private int id;

    @OneToOne(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private Event event;

    public Event getEvent() {
        return event;
    }

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<QuestionStr> questionStrs;

    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY
    )
    private List<QuestionInt> questionInts;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setEvent(Event event) {
        this.event = event;
    }


    public List<QuestionStr> getQuestionStrs() {
        return questionStrs;
    }

    public void setQuestionStrs(List<QuestionStr> questionStrs) {
        this.questionStrs = questionStrs;
    }

    public List<QuestionInt> getQuestionInts() {
        return questionInts;
    }

    public void setQuestionInts(List<QuestionInt> questionInts) {
        this.questionInts = questionInts;
    }
}
