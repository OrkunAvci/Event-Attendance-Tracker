package com.example.mid.controller;

import com.example.mid.dto.UserLoginDto;
import com.example.mid.model.User;
import com.example.mid.service.UserService;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/signUp")
    public void signUp(@RequestBody User user){
       userService.addUser(user);
    }

    @PostMapping("/login")
    public void login(@RequestBody UserLoginDto userLoginDto){ userService.login(userLoginDto); }
    
    @GetMapping("/getUserId")
    public int getUserId(@RequestParam String email){ return userService.getUserId(email); }
    
    @GetMapping("/getUser")
    public User getUser(@RequestParam int id){ return userService.getUser(id); }

    @GetMapping("/isOrganizer")
    public Boolean isOrganizer(@RequestParam int id){return userService.isOrganizer(id);}

    @PostMapping("/setCompany")
    public void setCompany(@RequestParam int userId,@RequestParam String company){userService.setCompany(company, userId);}

}
