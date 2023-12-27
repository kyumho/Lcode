package com.ll.medium.comment.dto;

import com.ll.medium.comment.entity.Comment;
import java.time.format.DateTimeFormatter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentDto {
    private Long id;
    private String content;
    private String author;
    private String createdAt;
    private String updatedAt;


    public static CommentDto fromEntityToDto(Comment comment) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return CommentDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getUser().getUsername())
                .createdAt(comment.getCreatedAt().format(formatter))
                .updatedAt(comment.getUpdatedAt().format(formatter))
                .build();
    }
}
