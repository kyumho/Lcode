package com.ll.medium.like.service;

import com.ll.medium.like.dto.LikeStatus;
import com.ll.medium.like.dto.LikeStatusDto;
import com.ll.medium.like.entity.Like;
import com.ll.medium.like.repository.LikeRepository;
import com.ll.medium.post.entity.Post;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    // 좋아요 상태 조회
    public LikeStatus getLikeStatus(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        Like like = likeRepository.findByUserIdAndPostId(userId, postId)
                .orElse(new Like(user, post, false)); // 좋아요가 없는 경우

        int likesCount = likeRepository.countByPostIdAndLiked(postId, true);
        return new LikeStatus(like.isLiked(), likesCount);
    }

    // 좋아요 상태 토글
    @Transactional
    public LikeStatus toggleLike(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid post ID"));

        Like like = likeRepository.findByUserIdAndPostId(userId, postId)
                .orElse(new Like(user, post, false)); // 좋아요가 없는 경우

        like.toggleLiked(); // 좋아요 상태 토글

        likeRepository.save(like); // 상태 변경 저장

        int likesCount = likeRepository.countByPostIdAndLiked(postId, true);
        return new LikeStatus(like.isLiked(), likesCount);
    }


}
