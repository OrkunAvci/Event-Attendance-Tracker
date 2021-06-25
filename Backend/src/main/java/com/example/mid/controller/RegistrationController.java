package com.example.mid.controller;

import com.example.mid.dto.Analytics;
import com.example.mid.model.Event;
import com.example.mid.model.Registration;
import com.example.mid.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/registration")
public class RegistrationController {
    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping("/createRegistration")
    public void createRegistration(@RequestBody Registration registration){registrationService.createRegistration(registration);}


    @GetMapping("/getCode")
    public String getCode(@RequestParam String email,@RequestParam int eventId){return registrationService.getCode(email,eventId);}

    @GetMapping("/verifyCode")
    public Boolean verifyCode(@RequestParam String email,@RequestParam int eventId,@RequestParam String code){
        return registrationService.verifyCode(email,eventId,code);
    }

    @GetMapping("/getRegEvents")
    public List<Event> getRegEvents(@RequestParam String email){return registrationService.getRegEvents(email);}

    @GetMapping("/getRegistrations")
    public List<Registration> getRegistrations(@RequestParam int id){return registrationService.getRegistrations(id);}

    @GetMapping("/getRegistration")
    public Registration getRegistration(@RequestParam String email,@RequestParam int eventId){return registrationService.getRegistration(email, eventId);}

    @GetMapping("/getAnalytics")
    public Analytics getAnalytics(@RequestParam int eventId){return registrationService.getAnalytics(eventId);}
}
