package com.example.mid.repository;

import com.example.mid.model.WhiteList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WhiteListRepository extends JpaRepository<WhiteList,Integer> {

    @Query("Select w from WhiteList w join w.event e where e.id = ?1")
    List<WhiteList> findWhiteList(int id);

}
