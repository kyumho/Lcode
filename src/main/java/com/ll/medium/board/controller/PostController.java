package com.ll.medium.board.controller;

import com.ll.medium.board.dto.PostRequestDto;
import com.ll.medium.board.service.PostService;
import com.ll.medium.common.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/post")
public class PostController {

    private final PostService postService;
    @PostMapping("/write")
    public ResponseEntity<?> save(@RequestBody PostRequestDto postRequestDto) {
        postService.save(postRequestDto);
        return ResponseEntity.ok("글 저장 완료");
    }


}

