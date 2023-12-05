package com.ll.medium.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {

    private String accessToken;

    private String refreshToken;
}
