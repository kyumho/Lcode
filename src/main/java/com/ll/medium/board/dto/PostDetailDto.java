package com.ll.medium.board.dto;

import com.ll.medium.board.entity.Post;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class PostDetailDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String createdAt;
    private String updatedAt;

    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public PostDetailDto(Post post) {
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.author = post.getUser().getUsername();
        this.createdAt = post.getCreatedAt().format(dateFormatter);
        this.updatedAt = post.getUpdatedAt().format(dateFormatter);
    }

}
