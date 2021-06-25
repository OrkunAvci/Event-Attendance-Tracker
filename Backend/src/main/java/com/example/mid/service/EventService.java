package com.example.mid.service;

import com.example.mid.model.Event;
import com.example.mid.model.Form;
import com.example.mid.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public int createEvent(Event event){
        if(event.getName() == "" || event.getStartDate() == null || event.getEndDate() == null ||
                event.getFormDate() == null || event.getEventUrl() == "" || event.getDescription() == ""){
            throw new IllegalStateException("fill");
        }
        Date date = new Date();
        event.setCreationDate(date);
        eventRepository.save(event);
        return event.getId();
    }

    public List<Event> getEventByName(String name){return eventRepository.findEventByName(name);}
    
    public Event getEventById(int id){return eventRepository.findEventById(id);}

    public Form getForm(int id) {
        Event event = eventRepository.findEventById(id);
        Form form = event.getForm();
        return form;
    }

    public List<Event> findUserEvents(int id){return eventRepository.findUserEvents(id);}
}
