package com.ll.medium.board.dto;

import com.ll.medium.board.entity.Post;
import com.ll.medium.user.entity.User;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private User author;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public PostDto(final PostRequestDto dto, User user) {
        this.author = user;
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = post.getUser();
        this.createdDate = post.getCreatedAt();
        this.modifiedDate = post.getUpdatedAt();
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(dto.getAuthor())
                .build();
    }
}
