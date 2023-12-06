package com.ll.medium.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private String email;
    private String phoneNumber;
    private String address;
    private String addressDetail;
    private String profileImageUrl;
}
