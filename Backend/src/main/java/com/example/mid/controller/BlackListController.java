package com.example.mid.controller;

import com.example.mid.model.Blacklist;
import com.example.mid.service.BlackListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/blackList")
public class BlackListController {
    private final BlackListService blackListService;

    @Autowired
    public BlackListController(BlackListService blackListService) {
        this.blackListService = blackListService;
    }

    @PostMapping("/addBlacklist")
    public void addBlackList(@RequestBody Blacklist blacklist){blackListService.addBlackList(blacklist);}

    @GetMapping("/getBlacklist")
    public List<Blacklist> getBlacklist(@RequestParam int id){return blackListService.getBlacklist(id);}

    @PostMapping("/deleteBlackList")
    public void deleteBlackList(@RequestParam int id,@RequestParam String email){blackListService.deleteBlacklist(id,email);}
}
