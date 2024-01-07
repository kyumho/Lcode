package com.ll.medium.like.controller;

import com.ll.medium.like.dto.LikeRequestDto;
import com.ll.medium.like.dto.LikeStatus;
import com.ll.medium.like.dto.LikeStatusDto;
import com.ll.medium.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1/likes")
@RestController
public class LikeController {

    private final LikeService likeService;

    // 좋아요 상태 조회
    @GetMapping("/status")
    public ResponseEntity<LikeStatusDto> getLikeStatus(@RequestParam Long userId, @RequestParam Long postId) {
        try {
            LikeStatus likeStatus = likeService.getLikeStatus(userId, postId);
            return ResponseEntity.ok(new LikeStatusDto(likeStatus.isLiked(), likeStatus.getLikesCount()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // 좋아요 상태 토글
    @PostMapping("/toggle")
    public ResponseEntity<LikeStatusDto> toggleLike(@RequestBody LikeRequestDto likeRequestDto) {
        try {
            LikeStatus likeStatus = likeService.toggleLike(likeRequestDto.getUserId(), likeRequestDto.getPostId());
            return ResponseEntity.ok(new LikeStatusDto(likeStatus.isLiked(), likeStatus.getLikesCount()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
