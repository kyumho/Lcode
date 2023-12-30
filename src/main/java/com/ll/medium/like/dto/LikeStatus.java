package com.ll.medium.like.dto;

public class LikeStatus {
    private final boolean liked;
    private final int likesCount;

    public LikeStatus(boolean liked, int likesCount) {
        this.liked = liked;
        this.likesCount = likesCount;
    }

    public boolean isLiked() {
        return liked;
    }

    public int getLikesCount() {
        return likesCount;
    }
}
