package com.example.mid.service;

import com.example.mid.Hash.Hash;
import com.example.mid.dto.UserLoginDto;
import com.example.mid.model.Company;
import com.example.mid.model.User;
import com.example.mid.repository.UserRepository;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.web.HateoasSortHandlerMethodArgumentResolver;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user) {
        if(user.getEmail() == null || user.getEmail() == "" || user.getPassword() == null || user.getPassword() == ""){
            throw new IllegalStateException("Wrong information");
        }
        Optional <User> userByEmail = userRepository.findUserByEmail(user.getEmail());
        if(userByEmail.isPresent()){
            throw new IllegalStateException("User Already Exist!");
        }
        Hash hash = new Hash(user.getPassword());
        user.setPassword(hash.getOutput0());
        userRepository.save(user);
    }

    public void login(UserLoginDto userLoginDto) {

        User user = userRepository.findByEmail(userLoginDto.getEmail());
        Hash hash = new Hash(userLoginDto.getPassword());
        String hashedPass = hash.getOutput0();

        if(!user.getPassword().equals(hashedPass)){
            throw new IllegalStateException("Wrong Password!");
        }
    }

    
    public int getUserId(String email)
    {
        User user = userRepository.findByEmail(email);
        return user.getId();
    }
    
    public User getUser(int id)
    {
        User user = userRepository.findById(id);
        user.setPassword("");
        return user;
    }

    public Boolean isOrganizer (int id){
        return userRepository.getOrg(id) != null;
    }

    public void setCompany(String name,int userId){
        User user = userRepository.findById(userId);
        user.setCompany(name);

    }

}
