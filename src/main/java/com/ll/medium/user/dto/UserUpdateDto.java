package com.ll.medium.user.dto;

import lombok.Data;

@Data
public class UserUpdateDto {
    private String password;
    private String email;
    private String address;
    private String addressDetail;
}
