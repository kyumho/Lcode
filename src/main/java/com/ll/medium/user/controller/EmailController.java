package com.ll.medium.user.controller;

import com.ll.medium.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/email")
public class EmailController {

    private final EmailService emailService;
    @GetMapping("/exist/{email}")
    public ResponseEntity<?> checkEmailExist(@PathVariable String email) {
        boolean exists = emailService.checkEmailExist(email);
        return ResponseEntity.ok(exists);
    }
}
