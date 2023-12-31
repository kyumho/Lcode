package com.ll.medium.like.repository;

import com.ll.medium.like.entity.Like;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByUserIdAndPostId(Long userId, Long postId);

    int countByPostIdAndLiked(Long postId, boolean b);

}

