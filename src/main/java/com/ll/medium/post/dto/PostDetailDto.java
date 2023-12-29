package com.ll.medium.post.dto;

import com.ll.medium.post.entity.Post;
import java.time.format.DateTimeFormatter;
import lombok.Data;

@Data
public class PostDetailDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String gptAnswer;
    private String createdAt;
    private String updatedAt;
    private Boolean isPaid;

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public PostDetailDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = post.getUser().getUsername();
        this.gptAnswer = post.getGptAnswer();
        this.createdAt = post.getCreatedAt().format(dateFormatter);
        this.updatedAt = post.getUpdatedAt().format(dateFormatter);
        this.isPaid = post.getIsPaid();
    }

}
