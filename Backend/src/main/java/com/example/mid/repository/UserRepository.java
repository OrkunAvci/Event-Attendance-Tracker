package com.example.mid.repository;

import com.example.mid.model.Company;
import com.example.mid.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    Optional <User> findUserByEmail(String email);

    @Query("Select u from User u where email= ?1")
    User findByEmail(String email);
    
    @Query("Select u from User u where id= ?1")
    User findById(int id);

    @Query("Select organizer from User where id = ?1")
    Boolean getOrg(int id);

    
}
