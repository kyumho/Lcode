package com.ll.medium.comment.dto;

import com.ll.medium.comment.entity.Comment;
import com.ll.medium.post.entity.Post;
import com.ll.medium.user.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentSaveDto {
    private Long postId;
    private String content;

    public static Comment toEntity(final CommentSaveDto dto, User user, Post post) {
        return Comment.builder()
                .user(user)
                .post(post)
                .content(dto.getContent())
                .build();
    }
}
