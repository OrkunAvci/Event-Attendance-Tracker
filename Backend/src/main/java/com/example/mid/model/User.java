package com.example.mid.model;



import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "user")


public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",nullable = false)
      private int id;

    @Column(name = "name")
     private String name;

    @Column(name = "surname")
     private String surname;

    @Column(name = "email",nullable = false)
     private String email;

    @Column(name = "password",nullable = false)
     private String password;

    @Column(name = "organizer")
    private Boolean organizer;

    @Column(name = "company")
    private String company;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Boolean getOrganizer() { return organizer; }

    public void setOrganizer(Boolean organizer) { this.organizer = organizer; }

    public String getCompany() { return company; }

    public void setCompany(String company) { this.company = company; }

    public User(){

    }

    public User(String name, String surname, String email, String password){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;

    }





}
