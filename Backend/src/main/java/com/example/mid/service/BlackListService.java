package com.example.mid.service;

import com.example.mid.model.Blacklist;
import com.example.mid.repository.BlackListRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class BlackListService {
    private final BlackListRepository blackListRepository;

    @Autowired
    public BlackListService(BlackListRepository blackListRepository) {
        this.blackListRepository = blackListRepository;
    }

    public void addBlackList(Blacklist blacklist){blackListRepository.save(blacklist);}

    public List<Blacklist> getBlacklist(int id){return blackListRepository.findBlacklist(id);}

    public void deleteBlacklist(int id,String email){
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "delete from black_list b where b.event_id = " + id + " and b.email = '" + email + "'";
        Query query = session.createNativeQuery(hql);
        query.executeUpdate();
        session.getTransaction().commit();
        session.close();
    }
}
