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
    private Boolean isPaid;
    private Boolean isPublished;
    private String gptAnswer;
    private Long views;
    private int likesCount;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public PostDto(final PostRequestDto dto, User user) {
        this.id = dto.getId();
        this.author = user;
        this.isPaid = dto.getIsPaid();
        this.isPublished = dto.getIsPublished();
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.likesCount = dto.getLikesCount();
        this.gptAnswer = dto.getGptAnswer();
        this.views = dto.getViews();
    }

    public PostDto(final Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.isPaid = post.getIsPaid();
        this.author = post.getUser();
        this.isPublished = post.getIsPublished();
        this.gptAnswer = post.getGptAnswer();
        this.createdDate = post.getCreatedAt();
        this.modifiedDate = post.getUpdatedAt();
        this.views = post.getViews();
        this.likesCount = post.getLikesCount();
    }

    public static Post toEntity(final PostDto dto) {
        return Post.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .user(dto.getAuthor())
                .isPaid(dto.getIsPaid())
                .isPublished(dto.getIsPublished())
                .gptAnswer(dto.getGptAnswer())
                .views(dto.getViews())
                .likesCount(dto.getLikesCount())
                .build();
    }
}
