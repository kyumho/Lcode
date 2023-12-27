package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import com.ll.medium.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
    Page<Post> findAllByIsPublishedTrue(Pageable pageable);

    Page<Post> findByIsPublishedFalseAndUser(User user, Pageable pageable);

    Page<Post> findByIsPublishedTrueAndUser(User user, Pageable pageable);
}
