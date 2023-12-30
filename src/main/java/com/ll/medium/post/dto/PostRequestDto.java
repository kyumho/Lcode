package com.ll.medium.post.dto;

import lombok.Data;

@Data
public class PostRequestDto {
    private Long id;
    private String title;
    private String content;
    private Boolean isPublished;
    private Boolean isPaid;
    private String gptAnswer;
    private Long views;
}
