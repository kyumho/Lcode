package com.ll.medium.user.controller;

import com.ll.medium.user.dto.KakaoPropertiesDto;
import com.ll.medium.user.dto.KakaoTokenResponseDto;
import com.ll.medium.user.dto.KakaoUserInfoDto;
import com.ll.medium.user.service.KakaoOAuth2Service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final KakaoOAuth2Service kakaoOAuth2Service;

    @GetMapping("/oauth2/kakao")
    public Mono<ResponseEntity<?>> handleOAuth2Callback(@RequestParam String code, HttpServletResponse response) {
        log.info("code = {}", code);

        return kakaoOAuth2Service.getToken(code)
                .flatMap(token -> {
                    String accessToken = token.getAccess_token();
                    log.info("accessToken : {}", accessToken);

                    return kakaoOAuth2Service.getUserInfo(accessToken);
                })
                .map(userInfo -> {
                    KakaoPropertiesDto properties = userInfo.getProperties();

                    String nickname = properties.getNickname();
                    String profileImageUrl = properties.getProfile_image();

                    kakaoOAuth2Service.registerUser(properties, response);

                    log.info("nickname : {}", nickname);
                    log.info("profileImageUrl : {}", profileImageUrl);

                    // 여기서 필요한 데이터를 포함하여 ResponseEntity를 구성합니다.
                    // 예: userInfo 또는 properties를 기반으로 응답 구성
                    return ResponseEntity.ok(userInfo);
                });
    }

}
