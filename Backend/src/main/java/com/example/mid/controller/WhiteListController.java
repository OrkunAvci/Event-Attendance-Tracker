package com.example.mid.controller;

import com.example.mid.model.WhiteList;
import com.example.mid.service.WhiteListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/whiteList")
public class WhiteListController {

    private final WhiteListService whiteListService;

    @Autowired
    public WhiteListController(WhiteListService whiteListService) {
        this.whiteListService = whiteListService;
    }

    @PostMapping("/addWhiteList")
    public void addWhiteList(@RequestBody WhiteList whiteList){whiteListService.addWhiteList(whiteList);}

    @GetMapping("/getWhitelist")
    public List<WhiteList> getWhiteList(@RequestParam int id){return whiteListService.getWhiteList(id);}

    @PostMapping("/deleteWhiteList")
    public void deleteWhiteList(@RequestParam int id,@RequestParam String email){whiteListService.deleteWhiteList(id, email);}
}
