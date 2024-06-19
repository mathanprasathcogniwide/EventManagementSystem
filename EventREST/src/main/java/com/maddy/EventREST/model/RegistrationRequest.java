package com.maddy.EventREST.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    private String eventTitle;
    private String name;
    private String phoneNumber;
}

