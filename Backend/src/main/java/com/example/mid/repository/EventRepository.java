package com.example.mid.repository;

import com.example.mid.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {

    @Query(value= "Select e from Event e Where e.name like %:name%")  // Make it use wildcard (%).
    List<Event> findEventByName(@Param("name") String name);
    
    @Query("Select e from Event e where id= ?1")
    Event findEventById(int id);

    @Query("Select e from Event e join e.user u where u.id = ?1")
    List<Event> findUserEvents(int id);
    
}
