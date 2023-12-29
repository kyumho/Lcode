package com.ll.medium.post.dto;

import lombok.Data;

@Data
public class PostUpdateDto {
    private String title;
    private String content;
    private String gptAnswer;
    private Boolean isPublished;
    private Boolean isPaid;
}
