package com.ll.medium.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.util.Date;
import lombok.Getter;

@Entity
@Getter
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    private Date expiryDate;

    public VerificationToken() {}

    // 토큰과 사용자를 받는 생성자
    public VerificationToken(String token, User user) {
        this.token = token;
        this.user = user;

        // 만료일을 설정하는 로직도 추가할 수 있
        // 예: 토큰이 생성된 후 24시간 후로 설정
        this.expiryDate = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000);
    }

}