package com.maddy.EventREST.controller;

import com.maddy.EventREST.model.EventPost;
import com.maddy.EventREST.model.RegistrationData;
import com.maddy.EventREST.model.RegistrationRequest;
import com.maddy.EventREST.model.User;
import com.maddy.EventREST.service.EventService;
import com.maddy.EventREST.service.JwtService;
import com.maddy.EventREST.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private EventService eveService;

    @Autowired
    private UserService UseService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody User user) {
        UseService.saveUser(user);
        return ResponseEntity.ok("Registered successfully");
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            // Generate JWT token
            String token = jwtService.generateAccessToken(user.getUsername());

            // Return the token in the response body
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


    @GetMapping("eventPosts")
    //@ResponseBody
    public List<EventPost> getAllEvents(){
        return eveService.returnAllEventPosts();
    }

    @GetMapping("eventPost/{eventTitle}")
    public EventPost getEvent(@PathVariable("eventTitle") String eventTitle){
        return eveService.getEvent(eventTitle);
    }

    @GetMapping("eventPosts/keyword/{keyword}")
    public List<EventPost> searchByKeyword(@PathVariable("keyword") String keyword){
        return eveService.search(keyword);
    }

    //@PostMapping(path = "eventPost", consumes = {"application/json"})// new data income must be only in Json format alone not any other format like xml or something
    @PostMapping("eventPost")
    public EventPost addEvent(@RequestBody EventPost eventPost){
        eveService.addEvent(eventPost);
        return eveService.getEvent(eventPost.getEventTitle());
    }

    @PutMapping("eventPost")
    public EventPost updateEvent(@RequestBody EventPost eventPost){
        eveService.updateEvent(eventPost);
        return eveService.getEvent(eventPost.getEventTitle());
    }

    @DeleteMapping("eventPost/{eventTitle}")
    public String delete(@PathVariable String eventTitle){
        eveService.deleteEvent(eventTitle);
        return "Deleted";
    }

    @PostMapping("registration")
    public String register(@RequestBody RegistrationRequest registrationRequest) {
        RegistrationData registrationData = new RegistrationData();
        registrationData.setEventName(registrationRequest.getEventTitle());
        registrationData.setName(registrationRequest.getName());
        registrationData.setPhoneNumber(registrationRequest.getPhoneNumber());
        eveService.processRegistration(registrationData);

        eveService.updateEventRegistrationStatus(registrationRequest.getEventTitle(), true);
        return "Registration Successful!";
    }

    @GetMapping("load")
    public String loadData(){
        eveService.load();
        return "success";
    }

}