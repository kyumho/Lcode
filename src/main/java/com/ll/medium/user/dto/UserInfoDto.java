package com.ll.medium.user.dto;

import com.ll.medium.user.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {

    private Long id;
    private String email;
    private String username;
    private String phoneNumber;
    private String address;
    private String addressDetail;
    private String profileImageUrl;
    private UserRole role;
}
