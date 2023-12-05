package com.ll.medium.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequestDto {

    @Email
    @NotEmpty(message = "이메일 비어있을 수 없습니다.")
    private String email;

    @NotEmpty
    private String password;
}
