package com.ll.medium.user.controller;


import com.ll.medium.user.dto.CheckUserExistDto;
import com.ll.medium.user.dto.LoginRequestDto;
import com.ll.medium.user.dto.LoginResponseDto;
import com.ll.medium.user.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto,
                                                  HttpServletResponse response) {
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();

        try {
            // 로그인 인증 및 Access Token, Refresh Token 발급
            LoginResponseDto loginResp = authService.authenticate(email, password);

            String accessToken = loginResp.getAccessToken();
            // 클라이언트에게 Access Token과 Refresh Token을 전달
            authService.setTokenInCookie(accessToken, loginResp.getRefreshToken(), response);
            return ResponseEntity.ok(loginResp);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 사용자가 존재하지 않는 경우
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 이메일이 인증되지 않은 경우
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 비밀번호가 틀린 경우
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        return authService.logout(request, response);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirmAccount(@RequestParam String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_HTML);

        try {
            authService.confirmAccount(token);

            String successHtml = authService.generateHtmlResponse("이메일 인증이 완료되었습니다!", "https://previews.123rf.com/images/lineartestpilot/lineartestpilot1803/lineartestpilot180307030/96672834-%EC%9B%83%EB%8A%94-%EC%82%AC%EC%9E%90-%EB%A7%8C%ED%99%94.jpg");
            return new ResponseEntity<>(successHtml, headers, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            String failureHtml = authService.generateHtmlResponse("이메일 인증에 실패하였습니다.", "https://us.123rf.com/450wm/marconi/marconi0807/marconi080700010/3322493-%EC%9A%B0%EB%8A%94-%EC%82%AC%EC%9E%90.jpg");
            return new ResponseEntity<>(failureHtml, headers, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/email-exists")
    public ResponseEntity<?> emailExist(@Valid @RequestBody CheckUserExistDto checkUserExistDto) {
        boolean checkUserExist = authService.checkIfEmailExist(checkUserExistDto.getEmail());
        if (checkUserExist){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
