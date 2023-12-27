package com.ll.medium.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class LoginRequestDto {

    @NotEmpty(message = "아이디는 비어있을 수 없습니다.")
    private String username;

    @NotEmpty
    private String password;
}
