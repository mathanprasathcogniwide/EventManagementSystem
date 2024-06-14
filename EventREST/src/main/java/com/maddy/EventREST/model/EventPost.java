package com.maddy.EventREST.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Component
@Entity
public class EventPost {

    @Id
    @Getter
    private String eventTitle;
    private String eventDesc;
    private String eventDate;
    private List<String> eventLocation;

    private boolean registered;

}