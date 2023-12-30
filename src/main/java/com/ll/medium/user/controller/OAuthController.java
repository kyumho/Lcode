package com.ll.medium.user.controller;

import com.ll.medium.user.dto.KakaoTokenResponseDto;
import com.ll.medium.user.service.KakaoOAuth2Service;
import java.security.Principal;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuthController {

    private final KakaoOAuth2Service kakaoOAuth2Service;

    @GetMapping("/oauth2/kakao")
    public ResponseEntity<?> handleOAuth2Callback(@RequestParam String code) {

        log.info("code = {}", code);

        // 인증 코드를 이용해 액세스 토큰 요청하고 사용자 정보 조회하는 로직
        // ...
        KakaoTokenResponseDto res = kakaoOAuth2Service.getToken(code);

        String accessToken = res.getAccess_token();

        log.info("accessToken : {}", accessToken);

        Map<String, Object> userInfo = kakaoOAuth2Service.getUserInfo(accessToken);
        // 이후 userInfo를 이용해 필요한 작업 수행

        // properties 맵을 추출합니다.
        Map<String, Object> properties = (Map<String, Object>) userInfo.get("properties");

        // 닉네임과 프로필 이미지 URL을 추출합니다.
        String nickname = (String) properties.get("nickname");
        String profileImageUrl = (String) properties.get("profile_image");

        log.info("nickname : {}", nickname);
        log.info("profileImageUrl : {}", profileImageUrl);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/user")
    public Principal user(Principal principal) {
        log.info(principal.toString());
        return principal;
    }
}
