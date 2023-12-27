package com.ll.medium.post.dto;

import com.ll.medium.post.entity.Post;
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
    private Boolean isPublished;
    private String gptAnswer;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public PostDto(final PostRequestDto dto, User user) {
        this.id = dto.getId();
        this.author = user;
        this.isPublished = dto.getIsPublished();
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.gptAnswer = dto.getGptAnswer();
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = post.getUser();
        this.isPublished = post.getIsPublished();
        this.gptAnswer = post.getGptAnswer();
        this.createdDate = post.getCreatedAt();
        this.modifiedDate = post.getUpdatedAt();
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(dto.getAuthor())
                .isPublished(dto.getIsPublished())
                .gptAnswer(dto.getGptAnswer())
                .build();
    }
}
