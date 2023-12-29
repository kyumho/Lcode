package com.ll.medium.user.service;


import com.ll.medium.user.dto.LoginResponseDto;
import com.ll.medium.user.entity.RefreshToken;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.entity.VerificationToken;
import com.ll.medium.user.repository.VerificationTokenRepository;
import com.ll.medium.user.security.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtTokenUtil jwtTokenUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final VerificationTokenRepository verificationTokenRepository;

    public LoginResponseDto authenticate(String username, String password) {

        User user = userService.getUserByUsername(username);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new BadCredentialsException("비밀번호가 틀립니다."); // 비밀번호가 틀린 경우
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException("이메일이 아직 인증되지 않았습니다."); // 이메일이 인증되지 않은 경우
        }

        // 로그인 성공 시 JWT 토큰 생성
        String accessToken = jwtTokenUtil.createAccessToken(username, List.of("USER"));

        RefreshToken foundRefreshToken = userService.findRefreshToken(username);
        String refreshToken;
        if (foundRefreshToken != null) {
            refreshToken = foundRefreshToken.getKeyValue();
        } else {
            refreshToken = jwtTokenUtil.createRefreshToken(username, List.of("USER"));
            userService.saveRefreshToken(username, refreshToken);
        }

        return new LoginResponseDto(accessToken, refreshToken);
    }

    public void confirmAccount(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid token"));

        userService.verifyEmail(verificationToken.getUser());
    }


    public void setTokenInCookie(String accessToken, String refreshToken, HttpServletResponse response) {
        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true)
                .path("/")
                .domain(".lionshop.me")
                .secure(true)
//                .sameSite("None") // SameSite 설정
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .path("/")
                .domain(".lionshop.me")
                .secure(true)
//                .sameSite("None") // SameSite 설정
                .build();

        response.addHeader("Set-Cookie", accessTokenCookie.toString());
        response.addHeader("Set-Cookie", refreshTokenCookie.toString());
    }

    public ResponseEntity<?> deleteCookie(HttpServletRequest request, HttpServletResponse response) {
        // 쿠키에서 accessToken과 refreshToken을 찾아서 삭제합니다.
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("accessToken") || cookie.getName().equals("refreshToken")) {
                    ResponseCookie deleteCookie = ResponseCookie.from(cookie.getName(), "")
                            .httpOnly(true)
                            .path("/")
                            .secure(true)
                            .sameSite("None") // SameSite 설정
                            .maxAge(0) // 쿠키의 유효기간을 0으로 설정하여 쿠키를 삭제
                            .build();

                    response.addHeader("Set-Cookie", deleteCookie.toString());
                }
            }
        }

        // 로그아웃에 성공했음을 알리는 응답을 반환합니다.
        return ResponseEntity.ok().body("로그아웃 성공");
    }

    public String generateHtmlResponse(String message, String imageUrl) {
        return "<html>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "</head>"
                + "<body>"
                + "<h1>" + message + "</h1>"
                + "<img src='" + imageUrl + "' alt='Lion Image'>"
                + "</body>"
                + "</html>";
    }

}
