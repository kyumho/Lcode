package com.ll.medium.like.dto;

import lombok.Data;

@Data
public class LikeStatusDto {
    private final boolean liked;
    private final int likesCount;

    public LikeStatusDto(boolean liked, int likesCount) {
        this.liked = liked;
        this.likesCount = likesCount;
    }

    // 클라이언트로 데이터를 전달하기 위한 JSON 형태로 직렬화하기 위해 getter 메서드가 필요
    public boolean isLiked() {
        return liked;
    }

    public int getLikesCount() {
        return likesCount;
    }
}