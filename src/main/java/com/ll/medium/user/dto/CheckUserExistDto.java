package com.ll.medium.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CheckUserExistDto {
    @NotBlank
    @Email
    private String email;
}
