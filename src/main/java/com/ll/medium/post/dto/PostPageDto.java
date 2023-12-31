package com.ll.medium.post.dto;

import com.ll.medium.post.entity.Post;
import java.time.format.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class PostPageDto {
    private Long id;
    private String title;
    private String content;
    private Boolean isPublished;
    private String gptAnswer;
    private Boolean isPaid;
    private String createdDate;
    private String modifiedDate;
    private String author;
    private Long views;
    private int likesCount;

    public static PostPageDto entityToDto(final Post post) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return PostPageDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .isPublished(post.getIsPublished())
                .isPaid(post.getIsPaid())
                .gptAnswer(post.getGptAnswer())
                .createdDate(post.getCreatedAt().format(dateFormatter))
                .modifiedDate(post.getUpdatedAt().format(dateFormatter))
                .author(post.getUser().getUsername())
                .views(post.getViews())
                .likesCount(post.getLikesCount())
                .build();
    }
}
