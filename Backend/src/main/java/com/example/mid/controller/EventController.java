package com.example.mid.controller;

import com.example.mid.model.Event;
import com.example.mid.model.Form;
import com.example.mid.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/createEvent")
    public int createEvent (@RequestBody Event event){return eventService.createEvent(event);}

    @GetMapping("/getEventByName")
    public List<Event> getEventByName(@RequestParam String name){return eventService.getEventByName(name);}
    
    @GetMapping("/getEventById")
    public Event getEventById(@RequestParam int id){return eventService.getEventById(id);}

    @GetMapping("/getForm")
    public Form getForm(@RequestParam int id){
        return eventService.getForm(id);
    }

    @GetMapping("/findUserEvents")
    public List<Event> findUserEvents(@RequestParam int id){return eventService.findUserEvents(id);}
}
