package com.maddy.EventREST.repo;

import com.maddy.EventREST.model.EventPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<EventPost, String> {
    List<EventPost> findByEventTitleContainingOrEventDescContaining(String eventTitle, String eventDesc);

//    List<EventPost> events = new ArrayList<>();
//
//    public EventRepo()  {
//
//        // Define the date format
//        //SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//
//        // Parse the date string into a Date object
//        //  Date eventDate = dateFormat.parse("03/06/24");
//
//        // Create an EventPost object and add it to the list
//        events.add(new EventPost("Music", "G.V.Prakash Free concert", "11/08/24", List.of("Theni", "Tenkasi", "Tiruppur")));
//        events.add(new EventPost("Cricket", "Dhoni Match", "16/06/24", List.of("Madurai", "Chennai", "Coimbatore")));
//        events.add(new EventPost("FootBall", "Ronaldo Match", "17/07/24", List.of("Madurai", "Chennai")));
//        events.add(new EventPost("Dance", "Prabhu Deva Dance", "16/07/24", List.of("Madurai", "Chennai", "Salem", "Sivaganga")));
//        events.add(new EventPost("Movie", "Thalapathy Vijay", "16/06/24", List.of("Madurai", "Chennai", "Coimbatore", "Dindigul")));
//    }
//
//    public List<EventPost> getAllEvents(){
//        return events;
//    }
//
//    public void addEvent(EventPost event){
//        events.add(event);
//        System.out.println(events);
//    }
//
//
//    public EventPost getEvent(String eventTitle) {
//        for(EventPost event : events){
//            if(event.getEventTitle().equals(eventTitle)) {
//                return event;
//            }
//        }
//        return null; // If no event with the given title is found
//    }
//
//    public void updateEvent(EventPost eventPost) {
//
//        for(EventPost eventPost1: events){
//            if(eventPost1.getEventTitle().equals(eventPost.getEventTitle())){
//                eventPost1.setEventTitle(eventPost.getEventTitle());
//                eventPost1.setEventDesc(eventPost.getEventDesc());
//                eventPost1.setEventDate(eventPost.getEventDate());
//                eventPost1.setEventLocation(eventPost.getEventLocation());
//
//            }
//
//        }
//    }
//
//    public void deleteEvent(String eventTitle) {
//
//        for(EventPost eventpost: events){
//            if(eventpost.getEventTitle().equals(eventTitle))
//                events.remove(eventpost);
//        }
//    }
}
