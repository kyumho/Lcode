package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {
    List<Post> findTop30ByIsPublishedTrueOrderByCreatedAtDesc();
    Page<Post> findAllWithFilters(Pageable pageable, String sortCode, String kwType, String keyword);
}
