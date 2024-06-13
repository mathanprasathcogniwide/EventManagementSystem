package com.maddy.EventREST.service;

import com.maddy.EventREST.model.EventPost;
import com.maddy.EventREST.model.RegistrationData;
import com.maddy.EventREST.repo.EventRepo;
import com.maddy.EventREST.repo.RegistrationDataRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepo repo;

    @Autowired
    private RegistrationDataRepo registrationRepo;

    public void addEvent(EventPost eventPost){

        //repo.addEvent(eventPost);
        repo.save(eventPost);
    }

    public List<EventPost> returnAllEventPosts(){

        //return repo.getAllEvents();
        return repo.findAll();
    }

    public EventPost getEvent(String eventTitle) {
        //return repo.getEvent(eventTitle);
        return repo.findById(eventTitle).orElse(new EventPost());
    }

    public void updateEvent(EventPost eventPost) {

        //repo.updateEvent(eventPost);
        repo.save(eventPost);
    }

    public void deleteEvent(String eventTitle) {

       // repo.deleteEvent(eventTitle);
        repo.deleteById(eventTitle);
    }

    public void processRegistration(RegistrationData registrationData) {
            registrationData.setEventName(registrationData.getEventName());
            registrationRepo.save(registrationData);
       // registrationRepo.save(registrationData);
    }

    public void updateEventRegistrationStatus(String eventTitle, boolean status) {
        EventPost eventPost = repo.findById(eventTitle).orElseThrow(() -> new RuntimeException("Event not found"));
        eventPost.setRegistered(status);
        repo.save(eventPost);
    }

    public void load(){
        List<EventPost> events;
        events = new ArrayList<>(List.of(

        new EventPost("Cricket", "Dhoni Match", "16/06/24", List.of("Madurai", "Chennai", "Coimbatore"),false),
        new EventPost("FootBall", "Ronaldo Match", "17/07/24", List.of("Madurai", "Chennai"),false),
        new EventPost("Dance", "Prabhu Deva Dance", "16/07/24", List.of("Madurai", "Chennai", "Salem", "Sivaganga"),false)

        ) );

        repo.saveAll(events);
    }

    //Intially, we have to use postman for loading the event post

    public List<EventPost> search(String keyword){
        return repo.findByEventTitleContainingOrEventDescContaining(keyword, keyword);
    }
}