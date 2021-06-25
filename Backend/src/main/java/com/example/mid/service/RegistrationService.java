package com.example.mid.service;

import com.example.mid.Hash.Hash;
import com.example.mid.dto.Analytics;
import com.example.mid.model.Event;
import com.example.mid.model.Registration;
import com.example.mid.repository.RegistrationRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

@Service
public class RegistrationService {

    private final RegistrationRepository registrationRepository;

    @Autowired
    public RegistrationService(RegistrationRepository registrationRepository) {
        this.registrationRepository = registrationRepository;
    }

    public void createRegistration(Registration registration){
        if(registration.getAuthorization() < registration.getEvent().getAuthorization()){
            throw new IllegalStateException("Invalid User Level");
        }
        String regMail = registration.getEmail();
        if(regMail == ""){
            throw new IllegalStateException("Enter email");
        }

        int regId = registration.getEvent().getId();
        Optional<Registration> checkReg = registrationRepository.checkReg(regMail,regId);
        if(checkReg.isPresent()){throw new IllegalStateException("Registration already exist!");}

        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "select count(*) from black_list b where b.event_id = " + regId + " and b.email = '" + regMail + "'";
        Query query = session.createNativeQuery(hql);
        int blackCount = ((Number) query.getSingleResult()).intValue();
        String hql2 = "select count(*) from white_list w where w.event_id = " + regId + " and w.email = '" + regMail + "'";
        Query query2 = session.createNativeQuery(hql2);
        int whiteCount = ((Number)query2.getSingleResult()).intValue();
        session.getTransaction().commit();
        session.close();

        int regCountEvent = registrationRepository.getRegCount(regId) + 1;
        if(regCountEvent > registration.getEvent().getMax()){
            throw new IllegalStateException("Max Registration");
        }
        if(whiteCount == 0) {
            if (blackCount > 0) {
                throw new IllegalStateException("Blacklist");
            }

            int regCount = registrationRepository.regCount(regMail);
            int regAttended = registrationRepository.regAttended(regMail);
            int regRate = 0;
            if (regCount > 0) {
                regRate = (regAttended / regCount) * 100;
            }

            if (registration.getEvent().getLoyalty() > regRate) {
                throw new IllegalStateException("Loyalty");
            }
        }
        String hashStr = regMail + String.valueOf(regId);
        Hash regHash = new Hash(hashStr);
        String regHashStr = regHash.getOutput0();
        registration.setCode(regHashStr);
        registrationRepository.save(registration);
    }

    public String getCode(String email,int eventId){
        Registration registration = registrationRepository.findCode(email,eventId);
        return registration.getCode();
    }

    public Boolean verifyCode(String email,int eventId,String code){
        Registration registration = registrationRepository.findCode(email,eventId);
        String trueCode = registration.getCode();
        if(code.equals(trueCode)){
            registration.setAttended(true);
            registrationRepository.save(registration);
            return true;
        }else{
            return false;
        }
    }

    public List<Event> getRegEvents (String email){ return registrationRepository.findRegEvents(email);}

    public List<Registration> getRegistrations(int id){return registrationRepository.findRegistrations(id);}

    public Registration getRegistration(String email,int eventId){return registrationRepository.getRegistration(email, eventId);}

    public Analytics getAnalytics(int eventId){
        Analytics analytics = new Analytics();
        analytics.setRegisteredCount(registrationRepository.getRegCount(eventId));
        analytics.setAttendedCount(registrationRepository.eventRegAttended(eventId));
        analytics.setNotAttendedCount(registrationRepository.eventRegNotAttended(eventId));
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "select count(*) from registration r join user u where r.event_id = " + eventId + " and r.email = u.email";
        Query query = session.createNativeQuery(hql);
        int registeredUser = ((Number) query.getSingleResult()).intValue();
        String hql2 = "select count(*) from registration r join user u where r.event_id = " + eventId + " and r.email = u.email and r.attended = true";
        Query query2 = session.createNativeQuery(hql2);
        int attendedUser = ((Number)query2.getSingleResult()).intValue();
        session.getTransaction().commit();
        session.close();
        analytics.setRegisteredUserCount(registeredUser);
        analytics.setAttendedUserCount(attendedUser);
        analytics.setNotAttendedUserCount(registeredUser-attendedUser);
        analytics.setRegisteredGuestCount(registrationRepository.getRegCount(eventId)-registeredUser);
        analytics.setAttendedGuestCount(registrationRepository.eventRegAttended(eventId)-attendedUser);
        analytics.setNotAttendedGuestCount(registrationRepository.eventRegNotAttended(eventId)-(registeredUser-attendedUser));

        return analytics;
    }

}
