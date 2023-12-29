package com.ll.medium.user.service;

import com.ll.medium.user.dto.LoginResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    LoginResponseDto authenticate(String username, String password);

    public void confirmAccount(String token);

    public void setTokenInCookie(String accessToken, String refreshToken, HttpServletResponse response);

    public ResponseEntity<?> deleteCookie(HttpServletRequest request, HttpServletResponse response);


    public String generateHtmlResponse(String message, String imageUrl);
}
