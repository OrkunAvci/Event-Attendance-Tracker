package com.example.mid.repository;



import com.example.mid.model.Event;
import com.example.mid.model.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RegistrationRepository extends JpaRepository<Registration,Integer> {

    @Query(value = "Select r from Registration r join r.event e where r.email= ?1 and e.id= ?2")
    Registration findCode(String email, int eventId);

    @Query("Select e from Registration r join r.event e where r.email = ?1")
    List<Event> findRegEvents(String email);

    @Query("Select r from Registration r join r.event e where e.id= ?1")
    List<Registration> findRegistrations(int id);

    @Query("Select r from Registration r join r.event e where r.email= ?1 and e.id= ?2")
    Optional<Registration> checkReg(String email, int eventId);

    @Query("Select COUNT(r) from Registration r where email = ?1")
    int regCount(String email);

    @Query("Select COUNT(r) from Registration r where email = ?1 and r.attended = true")
    int regAttended(String email);

    @Query("Select r from Registration r join r.event e where r.email= ?1 and e.id= ?2")
    Registration getRegistration(String email, int eventId);

    @Query("Select count(r) from Registration r join r.event e where e.id = ?1")
    int getRegCount(int eventId);

    @Query("Select count(r) from Registration r join r.event e where e.id = ?1 and r.attended = true")
    int eventRegAttended(int eventId);

    @Query("Select count(r) from Registration r join r.event e where e.id = ?1 and (r.attended = false or r.attended = null)")
    int eventRegNotAttended(int eventId);


}
