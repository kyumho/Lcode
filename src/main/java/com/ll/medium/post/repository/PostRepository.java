package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.entity.UserRole;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {
    Page<Post> findAllByIsPublishedTrue(Pageable pageable);

    // 'PAID' 역할을 가진 사용자가 작성한 게시글 찾기
    List<Post> findByUser_Role(UserRole role);

    Page<Post> findByIsPublishedFalseAndUser(User user, Pageable pageable);

    Page<Post> findByIsPublishedTrueAndUser(User user, Pageable pageable);
}
