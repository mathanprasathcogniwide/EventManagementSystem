package com.maddy.EventREST.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//Automatically send ID's for us
    private int id;
    private String username;
    private String password;

}
