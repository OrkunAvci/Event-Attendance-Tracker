package com.example.mid.repository;


import com.example.mid.model.Blacklist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlackListRepository extends JpaRepository<Blacklist,Integer> {

    @Query("Select b from Blacklist b join b.event e where e.id = ?1")
    List<Blacklist> findBlacklist(int id);

}
