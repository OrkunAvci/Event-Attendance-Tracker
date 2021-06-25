package com.example.mid.model;

import javax.persistence.*;

@Entity
@Table(name = "company")

public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id",nullable = false)
    private int id;

    @Column(name = "name")
    private String name;
    
    @Column(name = "creatorId")
    private int creatorId;
    
    private int[] owners;
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Company(String name, int creator){
        this.creatorId = creator;
        owners[0] = creator;
    }
}
