package com.ll.medium.like.dto;

import lombok.Data;

@Data
public class LikeRequestDto {
    private Long userId;
    private Long postId;
}
