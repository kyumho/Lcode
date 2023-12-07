package com.ll.medium.board.dto;

import com.ll.medium.board.entity.Post;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private String title;
    private String content;
    private String createdDate;
    private String modifiedDate;
    private String author;

    public static PostPageDto entityToDto(final Post post) {

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return PostPageDto.builder()
                .title(post.getTitle())
                .content(post.getContent())
                .createdDate(post.getCreatedAt().format(dateFormatter))
                .modifiedDate(post.getUpdatedAt().format(dateFormatter))
                .author(post.getUser().getUsername())
                .build();
    }
}
