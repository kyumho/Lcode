package com.ll.medium.user.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UserRegisterDto {

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

    @NotEmpty
    private String email;

    @NotEmpty
    private String address;

    @NotEmpty
    private String addressDetail;

    private String profilePictureUrl;
}
