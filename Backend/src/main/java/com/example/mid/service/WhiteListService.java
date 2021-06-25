package com.example.mid.service;

import com.example.mid.model.WhiteList;
import com.example.mid.repository.WhiteListRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WhiteListService {
    private final WhiteListRepository whiteListRepository;

    @Autowired
    public WhiteListService(WhiteListRepository whiteListRepository) {
        this.whiteListRepository = whiteListRepository;
    }

    public void addWhiteList(WhiteList whiteList){whiteListRepository.save(whiteList);}

    public List<WhiteList> getWhiteList(int id){return whiteListRepository.findWhiteList(id);}

    public void deleteWhiteList(int id,String email){
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "delete from white_list w where w.event_id = " + id + " and w.email = '" + email + "'";
        Query query = session.createNativeQuery(hql);
        query.executeUpdate();
        session.getTransaction().commit();
        session.close();
    }
}
